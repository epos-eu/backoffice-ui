import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { RevisionsComponent } from 'src/components/dialogs/revisions/revisions.component';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { ActionsService } from 'src/services/actions.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Entity } from 'src/utility/enums/entity.enum';
import { HelpersService } from 'src/services/helpers.service';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
import { SnackbarService } from 'src/services/snackbar.service';
import { State } from 'src/utility/enums/state.enum';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { OperationsService } from 'src/services/operations.service';
import { MatSelectChange } from '@angular/material/select';
import { SpatialExtent } from 'src/apiAndObjects/objects/types/spatialExtent.type';
import { SpatialCoverageType } from 'src/utility/enums/spatialCoverageType.enum';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-browse-data-products-item',
  templateUrl: './browse-data-products-item.component.html',
  styleUrls: ['./browse-data-products-item.component.scss'],
})
export class BrowseDataProductsItemComponent implements OnInit, OnDestroy {
  public floatLabelControl = new UntypedFormControl('auto');
  public dataProduct!: DataProductDetailDataSource | undefined;
  public UID!: string | null;
  public currentEdit!: IChangeItem;
  public form!: UntypedFormGroup;
  public entityRoute = EntityEndpointValue.DATA_PRODUCT;
  public contactPointDetails: Array<EntityDetail> = [];
  public distributionDetails: Array<EntityDetail> = [];
  public webserviceDetails: Array<EntityDetail> = [];
  public contactPointsFromCatalog: Array<ContactPointDetailDataSource> = [];
  public showContactPointSelect = false;
  public labelSpatialCoverage = '';
  public spatialCoveragePoint = SpatialCoverageType.POINT as string;
  public spatialCoveragePolygon = SpatialCoverageType.POLYGON as string;
  public spatialCoverageInput: string | undefined = '';
  public spatialCoverageChange: Subject<string | undefined> = new Subject();
  public spatialCoverageType = SpatialCoverageType.POLYGON;

  constructor(
    private dialogService: DialogService,
    private actionService: ActionsService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private persistorService: PersistorService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
    private operationsService: OperationsService,
  ) {
    this.UID = this.route.snapshot.paramMap.get('id');
  }

  private trackEdit(): void {
    this.actionService.currentEditObservable.subscribe((item: IChangeItem) => {
      if (item) {
        console.log(item);
        this.currentEdit = item;
      }
    });
  }

  ngOnInit(): void {
    this.persistorService.setValueInStorage(StorageType.LOCAL_STORAGE, StorageKey.ACTIVE_ENTITY, Entity.DATA_PRODUCT);
    this.route.paramMap.subscribe((obs) => {
      if (null != obs.get('id')) {
        this.initData(obs.get('id') as string);
      }
    });
  }

  ngOnDestroy(): void {
    this.actionService.cancelLiveEdit();
  }

  private initData(id: string): void {
    this.apiService.endpoints[Entity.DATA_PRODUCT].get
      .call(
        {
          instanceId: id,
        },
        false,
      )
      .then((data: Array<DataProductDetailDataSource>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.dataProduct = data.shift();
          if (this.dataProduct) {
            this.setSpatialCoverageVariables();

            this.operationsService.setActiveDataProduct(this.operationsService.convertToDataProduct(this.dataProduct));
            this.actionService.setLiveEdit();
            this.trackFormData();
            this.contactPointDetails = this.dataProduct.contactPoint;
            this.distributionDetails = this.dataProduct.distribution;
            this.actionService.trackCurrentEdit({
              type: Entity.DATA_PRODUCT,
              route: EntityEndpointValue.DATA_PRODUCT,
              label: 'Data Product',
              state: this.dataProduct.state,
              color: 'draft',
              id: this.dataProduct.instanceId,
            });
            this.trackEdit();
          }
        }
      });
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      instanceId: this.dataProduct?.instanceId as string,
      uid: this.dataProduct?.uid,
      metaId: this.dataProduct?.metaId,
      title: this.dataProduct?.title,
      description: this.dataProduct?.description,
      changeTimestamp: this.dataProduct?.changeTimestamp,
      state: this.dataProduct?.state,
      // identifier: [this.dataProduct?.identifier],
      // issued: this.isValidDate(this.dataProduct?.issued) ? this.dataProduct?.issued : '',
      keywords: HelpersService.whiteSpaceReplace(this.dataProduct?.keywords),
      modified: this.dataProduct?.modified,
      versionInfo: this.dataProduct?.versionInfo,
      spatialExtent: this.formatLocationFromObjectToString(),
      spatialExtentType: [this.spatialCoverageType],
      temporalExtent: this.formBuilder.array([]),
      distribution: this.formBuilder.array([]),
      contactPoint: this.formBuilder.array([]),
    });
    this.form.valueChanges.subscribe((changes) => {
      const updatingObject = this.operationsService.getActiveDataProductValue();
      if (updatingObject) {
        updatingObject.uid = changes['uid'];
        updatingObject.title = [changes['title']];
        updatingObject.description = [changes['description']];
        updatingObject.versionInfo = changes['versionInfo'];
        updatingObject.spatialExtent = this.formatLocationFromStringToObject(
          changes['spatialExtent'],
          changes['spatialExtentType'],
        );

        this.changeSpatialCoverageLabel(changes['spatialExtentType']);
        // TODO: Some stange behaviour where the detect changes pops value out of array.
        // value['title'] = [changes['title']];
        // value['description'] = [changes['description']];
        this.actionService.enableSave();
        this.operationsService.setActiveDataProduct(updatingObject);
        // this.persistorService.setValueInStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA, JSON.stringify(value));
      }
    });
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  public handleGetRevisions(): void {
    // Todo: pass revisions data to component
    this.dialogService.openDialogForComponent(
      RevisionsComponent,
      {
        metaId: this.dataProduct?.metaId,
      },
      '35vw',
      'auto',
      'revisions-dialog',
    );
  }

  public handleDelete(): void {
    // Todo: delete item from DB
    if (this.dataProduct?.instanceId) {
      this.dialogService.handleDelete(this.dataProduct?.instanceId, EntityEndpointValue.DATA_PRODUCT);
    }
  }

  public newDistribution() {
    const relatedDataProduct: EntityDetail = {
      entityType: Entity.DATA_PRODUCT,
      instanceId: this.dataProduct?.instanceId as string,
      uid: this.dataProduct?.uid as string,
      metaId: this.dataProduct?.metaId as string,
    };

    const item: Distribution = {
      uid: 'new distribution',
      modified: new Date().toISOString(),
      dataProduct: [relatedDataProduct],
    };

    this.apiService.endpoints.Distribution.create
      .call(item)
      .then((value: DistributionDetailDataSource) => {
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'close', 'success', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
        this.actionsService.addEditedItems([
          {
            type: Entity.DISTRIBUTION,
            route: EntityEndpointValue.DISTRIBUTION,
            label: 'Distribution',
            state: State.DRAFT,
            color: 'draft',
            id: value.instanceId,
          },
        ]);
        this.updateDistributionArray(value);
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: failed to create new Distribution.`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      );
  }

  public newContactPoint() {
    this.apiService.endpoints.Contactpoint.getAll
      .call()
      .then((data: Array<ContactPointDetailDataSource>) => {
        this.showContactPointSelect = true;
        this.contactPointsFromCatalog = data;
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: failed to request Contact Point entities.`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      );
  }

  public newSpatialCoverage() {
    this.dataProduct?.spatialExtent.push({ location: '' });
  }

  public updateContactPointArray(event: MatSelectChange) {
    const value: ContactPointDetailDataSource = event.value;
    const entityDetail: EntityDetail = {
      entityType: 'ContactPoint',
      instanceId: value.instanceId,
      uid: value.uid,
      metaId: value.metaId,
    };
    const dataProduct = this.operationsService.getActiveDataProductValue();
    this.contactPointDetails.push(entityDetail);
    if (null != dataProduct) {
      dataProduct.contactPoint = this.contactPointDetails;
      this.operationsService.setActiveDataProduct(dataProduct);
      this.showContactPointSelect = false;
    }
  }

  public updateDistributionArray(value: DistributionDetailDataSource) {
    const entityDetail: EntityDetail = {
      entityType: Entity.DISTRIBUTION,
      instanceId: value.instanceId,
      uid: value.uid,
      metaId: value.metaId,
    };
    const dataProduct = this.operationsService.getActiveDataProductValue();
    this.distributionDetails.push(entityDetail);
    if (null != dataProduct) {
      dataProduct.distribution = this.distributionDetails;
      this.operationsService.setActiveDataProduct(dataProduct);
    }
  }

  public refreshPointsOnMap() {
    this.spatialCoverageChange.next(
      this.locationToString(this.form.get('spatialExtent')?.value, this.form.get('spatialExtentType')?.value),
    );
  }

  private setSpatialCoverageVariables() {
    this.dataProduct?.spatialExtent.forEach((item) => {
      this.spatialCoverageType = item.location.includes(SpatialCoverageType.POINT)
        ? SpatialCoverageType.POINT
        : SpatialCoverageType.POLYGON;

      this.changeSpatialCoverageLabel(this.spatialCoverageType);

      this.spatialCoverageInput = item.location;
    });
  }

  private formatLocationFromObjectToString(): Array<string> {
    const locationObject = this.dataProduct?.spatialExtent;
    if (locationObject !== undefined) {
      return locationObject.map((spatial: SpatialExtent) => {
        let regex = /\(\((.*?)\)\)/g;
        if (spatial.location.includes(SpatialCoverageType.POINT)) {
          regex = /\((.*?)\)/g;
        }

        const match = regex.exec(spatial.location);
        return match !== null ? match[1] : '';
      });
    } else {
      return [''];
    }
  }

  private locationToString(value: string, type: string): string {
    if (type === SpatialCoverageType.POLYGON) {
      return type + '((' + value + '))';
    }
    return type + '(' + value + ')';
  }

  private formatLocationFromStringToObject(value: string, type: string): Array<SpatialExtent> {
    return [
      {
        location: this.locationToString(value, type),
      },
    ];
  }

  private changeSpatialCoverageLabel(pointType: string): void {
    this.labelSpatialCoverage =
      pointType === SpatialCoverageType.POINT ? 'Longitude Latitude' : 'List of coordinates (separated by comma)';
  }
}
