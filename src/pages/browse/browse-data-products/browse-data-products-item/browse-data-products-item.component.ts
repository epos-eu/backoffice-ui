import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
import { SnackbarService } from 'src/services/snackbar.service';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { OperationsService } from 'src/services/operations.service';
import { SpatialExtent } from 'src/apiAndObjects/objects/types/spatialExtent.type';
import { Subject } from 'rxjs';
import { OrganizationDataSource } from 'src/apiAndObjects/objects/data-source/organizationDataSource';
import { NgxMatDatetimepicker } from '@angular-material-components/datetime-picker';
import * as moment from 'moment';
import { AcrualPeriodicity } from 'src/utility/enums/vocabulary/accrualPeriodicity.enum';
import { DcmiType } from 'src/utility/enums/vocabulary/dcmiType.enum';
import { Identifier } from 'src/apiAndObjects/objects/types/identifier.type';
import { ExplorerService } from 'src/components/side-navigation/explorer-navigation/explorer.service';
import { FormTree } from 'src/components/side-navigation/explorer-navigation/formTree';
import { NgScrollbar } from 'ngx-scrollbar';
import { scrollBackToTop } from 'src/helpers/scroll';
import {
  DataproductAddDistributionComponent,
  NewDistribution,
} from 'src/components/dialogs/dataproduct-add-distribution/dataproduct-add-distribution.component';
import { DialogData } from 'src/components/dialogs/baseDialogService.abstract';
import { State } from 'src/utility/enums/state.enum';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { StateChangeService } from 'src/services/stateChange.service';
import { SpatialExtentLocationIndexObj } from './spatial-coverage-form-details/spatial-coverage-map/simpleSpatialControl/simpleSpatialControl.component';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-browse-data-products-item',
  templateUrl: './browse-data-products-item.component.html',
  styleUrls: ['./browse-data-products-item.component.scss'],
})
export class BrowseDataProductsItemComponent implements OnInit, OnDestroy {
  @ViewChild(NgScrollbar) scrollable!: NgScrollbar;
  @ViewChild(NgxMatDatetimepicker) public issuedPicker!: MatDatepicker<Date>;
  @ViewChild(NgxMatDatetimepicker) public tempStartDatePicker!: MatDatepicker<Date>;

  public floatLabelControl = new UntypedFormControl('auto');
  public dataProduct!: DataProductDetailDataSource | undefined;
  public UID!: string | null;
  public currentEdit!: IChangeItem;
  public form!: UntypedFormGroup;
  public entityRoute = EntityEndpointValue.DATA_PRODUCT;
  public contactPointDetails: Array<EntityDetail> | null = null;
  public contactPointShowSaveNotify = false;
  public distributionDetails: Array<EntityDetail> = [];
  public webserviceDetails: Array<EntityDetail> = [];
  public spatialCoverageInput: Array<string | undefined> = [];
  public spatialCoverageChange: Subject<Array<string | undefined>> = new Subject();
  public accrualPeriodicityOptions: Array<{ id: string; name: string }> = [];
  public typeOptions: Array<{ id: string; name: string }> = [];
  public dataProviders: Array<OrganizationDataSource> = [];
  public dataProvidersLoading = false;
  public selectedDataProviders: Array<OrganizationDataSource> = [];
  public selectedSection = '';
  public activeMetaId!: string;
  public activeInstanceId!: string;
  public entityEnum = Entity;
  public stateEnum = State;
  private updateMapTimeout?: NodeJS.Timeout;
  private formTree: FormTree = {
    id: '#dataproduct',
    name: 'Data Product',
    active: true,
    children: [
      {
        id: '#generalinformation',
        name: 'General Information',
        children: [],
      },
      {
        id: '#spatialcoverage',
        name: 'Spatial Coverage',
        children: [],
      },
      {
        id: '#temporalcoverage',
        name: 'Temporal Coverage',
        children: [],
      },
      {
        id: '#persistentidentifier',
        name: 'Identifiers',
        children: [],
      },
      {
        id: '#dataproviders',
        name: 'Data Providers',
        children: [],
      },
      {
        id: '#contactpoint',
        name: 'Contact Points',
        children: [],
      },
    ],
    expanded: true,
  };

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
    private explorerService: ExplorerService,
    private stateChangeService: StateChangeService,
  ) {
    this.UID = this.route.snapshot.paramMap.get('id');
    this.accrualPeriodicityOptions = Object.entries(AcrualPeriodicity).map((e) => ({ name: e[1], id: e[0] }));
    this.typeOptions = Object.entries(DcmiType).map((e) => ({ name: e[1], id: e[0] }));

    this.stateChangeService.triggerReloadObs.subscribe((requiresRefresh: boolean) => {
      if (requiresRefresh) {
        this.initData(this.activeInstanceId, this.activeMetaId);
      }
    });

    this.actionService.triggerDataProductReloadObs.subscribe((requiresRefresh: boolean) => {
      if (requiresRefresh) {
        this.initData(this.activeInstanceId, this.activeMetaId);
      }
    });
  }

  private trackEdit(): void {
    this.actionService.currentEditObservable.subscribe((item: IChangeItem) => {
      if (item) {
        this.currentEdit = item;
      }
    });
  }

  ngOnInit(): void {
    this.operationsService.activeEntityType.next(Entity.DATA_PRODUCT);
    this.route.paramMap.subscribe((obs) => {
      if (null != obs.get('id') && null != obs.get('metaId')) {
        this.activeInstanceId = obs.get('id') as string;
        this.activeMetaId = obs.get('metaId') as string;
        this.initData(this.activeInstanceId, this.activeMetaId);
      }
    });

    this.explorerService.gotoObs.subscribe((obs) => {
      this.selectedSection = obs;
    });

    this.actionService.formEditedObs.subscribe((value: boolean) => {
      if (value === false) {
        // reset notification
        this.contactPointShowSaveNotify = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.actionService.cancelLiveEdit();
  }

  private initData(id: string, metaId: string): void {
    this.apiService.endpoints[Entity.DATA_PRODUCT].get
      .call(
        {
          metaId: metaId,
          instanceId: id,
        },
        false,
      )
      .then((data: Array<DataProductDetailDataSource>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.dataProduct = data.shift();
          if (this.dataProduct) {
            this.stateChangeService.setCurrentDataProductState(this.dataProduct.state);
            this.operationsService.setActiveDataProduct(this.operationsService.convertToDataProduct(this.dataProduct));
            this.actionService.setLiveEdit();
            this.trackFormData();
            this.contactPointDetails = this.dataProduct.contactPoint;
            this.distributionDetails = this.dataProduct.distribution;
            this.setSpatialCoverageVariables();
            this.actionService.trackCurrentEdit({
              type: Entity.DATA_PRODUCT,
              route: EntityEndpointValue.DATA_PRODUCT,
              label: 'Data Product',
              state: this.dataProduct.state,
              color: 'draft',
              id: this.dataProduct.instanceId,
            });
            this.trackEdit();
            if (this.dataProduct.state === State.PUBLISHED) {
              this.form.disable();
            }
          }
        }
      });
  }

  private createIdentifierFormGroup(identifier: Identifier): FormGroup {
    return this.formBuilder.group({
      identifier: [identifier.identifier, [Validators.required]],
      type: [identifier.type, [Validators.required]],
    });
  }

  private loadIdentifierArray(identifier: Array<Identifier>): FormGroup[] {
    const transformed = identifier.map((item: Identifier) => this.createIdentifierFormGroup(item));
    return transformed;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private dateComparison(start: string, end: string): (group: FormGroup) => { [key: string]: any } {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (group: FormGroup): { [key: string]: any } => {
      const startCtrl = group.controls[start];
      const endCtrl = group.controls[end];

      if (endCtrl.value == null) {
        return {
          dates: 'If no end date is provided, it is assumed that this dataset is acquired continuously.',
        };
      }

      if (moment(startCtrl.value).isAfter(endCtrl.value)) {
        startCtrl.markAsTouched();
        endCtrl.markAsTouched();

        return {
          dates: 'Start date needs to be before end date.',
        };
      }
      return {};
    };
  }

  private trackFormData(): void {
    if (this.dataProduct) {
      this.form = this.formBuilder.group({
        instanceId: this.dataProduct?.instanceId,
        uid: this.dataProduct?.uid,
        metaId: this.dataProduct?.metaId,
        title: this.dataProduct?.title,
        description: this.dataProduct?.description,
        changeTimestamp: this.dataProduct?.changeTimestamp,
        state: this.dataProduct?.state,
        keywords: HelpersService.whiteSpaceReplace(this.dataProduct?.keywords),
        created: this.dataProduct?.created,
        modified: this.dataProduct?.modified,
        versionInfo: this.dataProduct?.versionInfo,
        temporalDates: this.formBuilder.group(
          {
            startDate: [this.getTemporalExtent('startDate')],
            endDate: [this.getTemporalExtent('endDate')],
          },
          { validator: this.dateComparison('startDate', 'endDate') } as AbstractControlOptions,
        ),
        distribution: this.formBuilder.array([]),
        contactPoint: this.formBuilder.array([]),
        issued: this.dataProduct?.issued,
        identifier: this.formBuilder.array(this.loadIdentifierArray(this.dataProduct?.identifier)),
        qualityAssurance: this.formBuilder.control(this.dataProduct.qualityAssurance, [
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (control: AbstractControl): { [key: string]: any } | null => {
            if (control.value === '') {
              return null;
            }

            if (this.operationsService.isValidHttpUrl(control.value)) {
              return null;
            } else {
              control.markAsTouched();
              return { 'error-class': control.value };
            }
          },
        ]),
        publisher: this.dataProduct?.publisher,
        accrualPeriodicity: this.dataProduct?.accrualPeriodicity,
        type: this.dataProduct?.type,
      });

      this.explorerService.setFormSection(null, this.formTree, true);

      this.form.valueChanges.subscribe((changes) => {
        const updatingObject = this.operationsService.getActiveDataProductValue();

        if (updatingObject) {
          updatingObject.uid = changes['uid'];
          updatingObject.title = [changes['title']];
          updatingObject.description = [changes['description']];
          updatingObject.keywords = changes['keywords'];
          updatingObject.versionInfo = changes['versionInfo'];

          updatingObject.temporalExtent = [
            {
              startDate: changes.temporalDates['startDate'],
              endDate: changes.temporalDates['endDate'],
            },
          ];

          if (changes['issued'] !== null) {
            updatingObject.issued = changes['issued'];
          }

          updatingObject.accrualPeriodicity = changes['accrualPeriodicity'];
          updatingObject.type = changes['type'];
          updatingObject.identifier = changes.identifier;
          updatingObject.qualityAssurance = changes.qualityAssurance;

          console.log(updatingObject);

          this.actionService.enableSave();
          this.operationsService.setActiveDataProduct(updatingObject);
          this.persistorService.setValueInStorage(
            StorageType.LOCAL_STORAGE,
            StorageKey.FORM_DATA,
            JSON.stringify(updatingObject),
          );
        }
      });
    }
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  public handleGetRevisions(): void {
    this.dialogService.openDialogForComponent(
      RevisionsComponent,
      {
        metaId: this.dataProduct?.metaId,
        type: Entity.DATA_PRODUCT,
      },
      '65vw',
      'auto',
      'revisions-dialog',
    );
  }

  public handleDelete(): void {
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
      uid: 'TEMP_DISTRIBTUION_UID/TO_BE_HANDLED_BY_API',
      modified: new Date().toISOString(),
      dataProduct: [relatedDataProduct],
    };

    this.dialogService
      .openDialogForComponent(DataproductAddDistributionComponent, {}, '35vw', 'auto', 'add-distribution-dialog')
      .then((data: DialogData<object, NewDistribution>) => {
        if (data.dataOut.cancel === false) {
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
              this.actionsService.enableSave();
            })
            .catch((err) => {
              console.error(err);
              this.snackbarService.openSnackbar(`Error: failed to create new Distribution.`, 'close', 'error', 6000, [
                'snackbar',
                'mat-toolbar',
                'snackbar-error',
              ]);
            });
        }
      });
  }

  public updateContactPointArray(newContactPointDetails: Array<EntityDetail>) {
    const dataProduct = this.operationsService.getActiveDataProductValue();
    this.contactPointDetails = newContactPointDetails;
    if (null != dataProduct) {
      dataProduct.contactPoint = this.contactPointDetails;
      this.operationsService.setActiveDataProduct(dataProduct);
    }

    // inform user that he has to save entire form
    this.contactPointShowSaveNotify = true;
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

  public newSpatialCoverage() {
    this.dataProduct?.spatialExtent.push({ location: 'POINT(0 0)' });
    this.spatialCoverageInput.push('0 0');

    // Update Global Dataproduct after change to Spatial Extents Arr
    this.operationsService.setActiveDataProduct(
      this.operationsService.convertToDataProduct(this.dataProduct as DataProductDetailDataSource),
    );

    setTimeout(() => {
      this.refreshPointsOnMap();
    }, 100);
  }

  public deleteSpatialCoverage(index: number) {
    this.spatialCoverageInput.splice(index, 1);
    this.dataProduct?.spatialExtent.splice(index, 1);

    // Update Global Dataproduct after change to Spatial Extents Arr
    this.operationsService.setActiveDataProduct(
      this.operationsService.convertToDataProduct(this.dataProduct as DataProductDetailDataSource),
    );

    setTimeout(() => {
      this.refreshPointsOnMap();
    }, 100);
  }

  /**
   * This funtion is called by an ouput from @SimpleSpatialControlComponent whenever one of the Spatial Coverage Inputs is changed.
   * It replaces the old value value at index @n and replaces the value with the updated one.
   */
  public updateSpatialCoverage(event: SpatialExtentLocationIndexObj) {
    // Update global DataProduct Obj
    const dataProduct = this.operationsService.getActiveDataProductValue();
    if (null != dataProduct?.spatialExtent) {
      dataProduct.spatialExtent.forEach((spatialExtent: SpatialExtent, index) => {
        if (event.index === index) {
          spatialExtent.location = event.location;
        }
      });
      // Update points on map
      this.operationsService.setActiveDataProduct(dataProduct);
      const spatExtentsToUpdate: Array<string> = [];
      dataProduct.spatialExtent.forEach((spatialExtent: SpatialExtent) => {
        spatExtentsToUpdate.push(spatialExtent.location);
      });
      this.spatialCoverageInput = spatExtentsToUpdate;

      clearTimeout(this.updateMapTimeout);
      this.updateMapTimeout = setTimeout(() => {
        this.refreshPointsOnMap();
      }, 100);
    }
  }

  /**
   * The function refreshes points on a map by formatting the spatial extent from a string to an object
   * and emitting the location values.
   */
  public refreshPointsOnMap() {
    this.spatialCoverageChange.next(this.spatialCoverageInput);
    this.actionService.enableSave();
  }

  /**
   * The function sets spatial coverage variables based on the data product's spatial extent.
   */
  private setSpatialCoverageVariables() {
    this.dataProduct?.spatialExtent.forEach((item, index) => {
      this.spatialCoverageInput[index] = item.location;
    });
  }

  private getTemporalExtent(type = 'startDate'): Date | undefined | null {
    const temporalExtent = this.dataProduct?.temporalExtent;
    if (temporalExtent !== undefined && temporalExtent.length > 0) {
      if (type === 'startDate') {
        return temporalExtent[0].startDate;
      }
      return temporalExtent[0].endDate;
    }
    return null;
  }

  public handleDataProviders(): void {
    if (this.dataProviders.length === 0) {
      this.dataProvidersLoading = true;
      this.apiService.endpoints.Organization.getAll.call().then((response: OrganizationDataSource[]) => {
        this.dataProviders = response;
        this.dataProvidersLoading = false;
        this.selectedDataProviders = this.dataProviders.filter((provider: OrganizationDataSource) => {
          return provider.uid === this.dataProduct?.publisher[0].uid;
        });
      });
    }
  }

  public handleDataProviderChange(event: Array<OrganizationDataSource>): void {
    const mapped = event.map((item: OrganizationDataSource) => {
      return {
        uid: item.uid,
        metaId: item.metaId,
        instanceId: item.instanceId,
        entityType: '',
        name: item.legalName,
      };
    });
    mapped.forEach((publisher: EntityDetail, index: number) => {
      if (this.dataProduct) {
        this.dataProduct.publisher[index] = publisher;
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public compareWithFn(optionOne: any, optionTwo: any): boolean {
    if (optionOne.metaId === optionTwo.metaId) {
      return true;
    }
    return false;
  }

  public handleAddIdentifier(): void {
    const identifier = this.form.get('identifier') as FormArray;
    identifier.push(
      new FormGroup({
        identifier: new FormControl(''),
        type: new FormControl(''),
      }),
    );
  }
  public handleDeleteIdentifier(index: number): void {
    const identifier = this.form.get('identifier') as FormArray;
    identifier.removeAt(index);
  }

  public handleScrollToTop(): void {
    scrollBackToTop(this.scrollable);
  }

  public handleClearDatePicker(fieldName: string): void {
    const control = this.form.get(fieldName);
    if (control) {
      this.operationsService.clearDatePicker(control);
    }
  }

  public getDataProviderName(uid: string): string {
    const provider = this.dataProviders.find((provider) => provider.uid === uid);
    console.log(provider);
    if (provider && provider.legalName.length > 0) {
      return provider.legalName.shift() as string;
    }
    return '-';
  }
}

export type SpatialGroup = {
  type: string;
  coord: string;
};
