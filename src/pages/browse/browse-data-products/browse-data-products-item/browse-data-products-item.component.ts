import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { DialogRevisionsComponent } from 'src/components/dialogs/dialog-revisions/dialog-revisions.component';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { ActionsService } from 'src/services/actions.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Entity } from 'src/utility/enums/entity.enum';
import { HelpersService } from 'src/services/helpers.service';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { SnackbarService } from 'src/services/snackbar.service';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { AcrualPeriodicity } from 'src/utility/enums/vocabulary/accrualPeriodicity.enum';
import { DcmiType } from 'src/utility/enums/vocabulary/dcmiType.enum';
import { NgScrollbar } from 'ngx-scrollbar';
import { scrollBackToTop } from 'src/helpers/scroll';
import {
  DialogDataproductAddDistributionComponent,
  NewDistribution,
} from 'src/components/dialogs/dialog-dataproduct-add-distribution/dialog-dataproduct-add-distribution.component';
import { DialogData } from 'src/components/dialogs/baseDialogService.abstract';
import { Status } from 'src/utility/enums/status.enum';
import { Distribution, DataProduct, LinkedEntity, Organization } from 'generated/backofficeSchemas';
import { StateChangeService } from 'src/services/stateChange.service';
import { EntityFieldValue } from 'src/utility/enums/entityFieldValue.enum';
import { LoadingService } from 'src/services/loading.service';
import { NavigationService } from 'src/services/navigation.service';
import { DataProductForm } from 'src/shared/interfaces/form.interface';

@Component({
  selector: 'app-browse-data-products-item',
  templateUrl: './browse-data-products-item.component.html',
  styleUrls: ['./browse-data-products-item.component.scss'],
})
export class BrowseDataProductsItemComponent implements OnInit, OnDestroy {
  @ViewChild(NgScrollbar) scrollable!: NgScrollbar;

  private subscriptions = new Subscription();
  public floatLabelControl = new UntypedFormControl('auto');
  public dataProduct!: DataProduct | undefined;
  public UID!: string | null;
  public currentEdit!: IChangeItem;
  public form!: DataProductForm;
  public entityRoute = EntityEndpointValue.DATA_PRODUCT;
  public contactPointDetails: Array<LinkedEntity> | undefined = [];
  public contactPointShowSaveNotify = false;
  public distributionDetails: Array<LinkedEntity> | undefined = [];
  public webserviceDetails: Array<LinkedEntity> = [];
  public spatialCoverageInput: Array<string | undefined> = [];
  public spatialCoverageChange: Subject<Array<string | undefined>> = new Subject();
  public accrualPeriodicityOptions: Array<{ id: string; name: string }> = [];
  public typeOptions: Array<{ id: string; name: string }> = [];
  public dataProviders: Array<Organization> = [];
  public dataProvidersLoading = false;
  public selectedDataProviders: Array<Organization> = [];
  public selectedSection = '';
  public activeMetaId!: string;
  public activeInstanceId!: string;
  public entityEnum = Entity;
  public stateEnum = Status;
  public entityFieldEnum = EntityFieldValue;
  public activeItem: string = '';
  public activeTitle: string = '';

  constructor(
    private dialogService: DialogService,
    private actionService: ActionsService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private persistorService: PersistorService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
    private entityExecutionService: EntityExecutionService,
    private stateChangeService: StateChangeService,
    private helpersService: HelpersService,
    private loadingService: LoadingService,
    private navigationService: NavigationService,
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

  private initSubscriptions(): void {
    this.subscriptions.add(
      this.route.paramMap.subscribe((obs) => {
        if (null != obs.get('id') && null != obs.get('metaId')) {
          this.activeInstanceId = obs.get('id') as string;
          this.activeMetaId = obs.get('metaId') as string;
          this.initData(this.activeInstanceId, this.activeMetaId);
        }
      }),
    );
    this.subscriptions.add(
      this.actionService.formEditedObs.subscribe((value: boolean) => {
        // Reset notification
        if (value === false) {
          this.contactPointShowSaveNotify = false;
        }
      }),
    );
    this.subscriptions.add(
      this.navigationService.dataProductActiveItemObs.subscribe((id: string) => {
        this.activeItem = id;
      }),
    );
    this.subscriptions.add(
      this.navigationService.dataProductActiveItemTitleObs.subscribe((title: string) => {
        this.activeTitle = title;
      }),
    );
  }

  public ngOnInit(): void {
    this.helpersService.activeEntityType.next(Entity.DATA_PRODUCT);
    this.initSubscriptions();
  }

  public ngOnDestroy(): void {
    this.actionService.cancelLiveEdit();
    this.subscriptions.unsubscribe();
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
      .then((data: Array<DataProduct>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.dataProduct = data.shift();
          if (this.dataProduct) {
            this.stateChangeService.setCurrentDataProductState(this.dataProduct.status);
            this.entityExecutionService.setActiveDataProduct(
              this.entityExecutionService.convertToDataProduct(this.dataProduct),
            );
            this.actionService.setLiveEdit();
            this.initForm();
            this.trackFormData();
            this.contactPointDetails = this.dataProduct.contactPoint;
            this.distributionDetails = this.dataProduct.distribution;
            this.setSpatialCoverageVariables();
            this.trackEdit();
            if (this.dataProduct.status === Status.PUBLISHED || this.dataProduct.status === Status.ARCHIVED) {
              this.form.disable();
            }
          }
        }
      });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      instanceId: this.dataProduct?.instanceId,
      uid: this.dataProduct?.uid,
      generalInformation: this.formBuilder.group({
        title: new FormControl(this.dataProduct?.title),
        description: new FormControl(this.dataProduct?.description),
        keywords: new FormControl(this.dataProduct?.keywords),
        versionInfo: new FormControl(this.dataProduct?.versionInfo),
        accrualPeriodicity: new FormControl(this.dataProduct?.accrualPeriodicity),
        type: new FormControl(this.dataProduct?.type),
        issued: new FormControl(this.dataProduct?.issued),
        created: new FormControl(this.dataProduct?.created),
        modified: new FormControl(this.dataProduct?.modified),
        qualityAssurance: new FormControl(this.dataProduct?.qualityAssurance),
      }),
      distribution: this.formBuilder.array([]),
      contactPoint: this.formBuilder.array([]),
      publisher: this.dataProduct?.publisher,
      changeTimestamp: this.dataProduct?.changeTimestamp,
      state: this.dataProduct?.status,
    });
  }

  private trackFormData(): void {
    if (this.dataProduct) {
      let updatingObject = this.entityExecutionService.getActiveDataProductValue() || {};
      this.form.valueChanges.pipe(debounceTime(500)).subscribe((changes) => {
        if (this.dataProduct?.status === Status.DRAFT && changes.distribution?.length === 0) {
          this.actionsService.disableSave();
        }

        if (this.form.valid) {
          this.actionsService.enableSave();
        } else {
          this.actionsService.disableSave();
        }

        updatingObject = {
          ...updatingObject,
          uid: changes.uid,
          title: this.helpersService.formatArrayVal(changes.generalInformation?.title),
          description: this.helpersService.formatArrayVal(changes.generalInformation?.description),
          keywords: changes.generalInformation?.keywords,
          versionInfo: changes.generalInformation?.versionInfo,
          issued: changes.generalInformation?.issued,
          accrualPeriodicity: changes.generalInformation?.accrualPeriodicity,
          type: changes.generalInformation?.type,
          qualityAssurance: changes.generalInformation?.qualityAssurance,
        };

        this.entityExecutionService.setActiveDataProduct(updatingObject);
        this.persistorService.setValueInStorage(
          StorageType.LOCAL_STORAGE,
          StorageKey.FORM_DATA,
          JSON.stringify(updatingObject),
        );
      });
    }
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  public handleGetRevisions(): void {
    this.dialogService.openDialogForComponent(
      DialogRevisionsComponent,
      {
        metaId: this.dataProduct?.metaId,
        type: Entity.DATA_PRODUCT,
        instanceId: this.dataProduct?.instanceId,
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
    const relatedDataProduct: LinkedEntity = {
      entityType: Entity.DATA_PRODUCT,
      instanceId: this.dataProduct?.instanceId as string,
      uid: this.dataProduct?.uid as string,
      metaId: this.dataProduct?.metaId as string,
    };
    const item: Distribution = {
      modified: new Date().toISOString(),
      dataProduct: [relatedDataProduct],
    };

    this.dialogService
      .openDialogForComponent(DialogDataproductAddDistributionComponent, {}, 'add-distribution-dialog')
      .then((data: DialogData<object, NewDistribution>) => {
        if (data.dataOut.cancel === false) {
          this.loadingService.setShowSpinner(true);
          this.apiService.endpoints.Distribution.create
            .call(item)
            .then((value: Distribution) => {
              this.snackbarService.openSnackbar(
                'Please add a Distribution title then click "Save Distribution" followed by "Save" using the Explorer.',
                'close',
                'warning',
                10000000,
                ['snackbar', 'mat-toolbar', 'snackbar-warning'],
              );
              this.actionsService.addEditedItems([
                {
                  type: Entity.DISTRIBUTION,
                  route: EntityEndpointValue.DISTRIBUTION,
                  label: 'Distribution',
                  state: Status.DRAFT,
                  color: 'draft',
                  id: value.instanceId as string,
                },
              ]);
              this.updateDistributionArray(value);
            })
            .catch((err) => {
              console.error(err);
              this.snackbarService.openSnackbar(`Error: failed to create new Asset.`, 'close', 'error', 6000, [
                'snackbar',
                'mat-toolbar',
                'snackbar-error',
              ]);
            })
            .finally(() => {
              this.loadingService.setShowSpinner(false);
            });
        }
      });
  }

  public updateDistributionArray(value: Distribution) {
    const entityDetail: LinkedEntity = {
      entityType: Entity.DISTRIBUTION,
      instanceId: value.instanceId,
      uid: value.uid,
      metaId: value.metaId,
    };
    const dataProduct = this.entityExecutionService.getActiveDataProductValue();
    this.distributionDetails?.push(entityDetail);
    if (null != dataProduct) {
      dataProduct.distribution = this.distributionDetails;
      this.actionsService.enableSave();
      this.entityExecutionService.setActiveDataProduct(dataProduct);
    }
  }

  /**
   * The function sets spatial coverage variables based on the data product's spatial extent.
   */
  private setSpatialCoverageVariables() {
    this.dataProduct?.spatialExtent?.forEach((item, index) => {
      // this.spatialCoverageInput[index] = item.location;
    });
  }

  public handleScrollToTop(): void {
    scrollBackToTop(this.scrollable);
  }

  public getDataProviderName(uid: string): string {
    const provider = this.dataProviders.find((provider) => provider.uid === uid);
    if (Array.isArray(provider?.legalName) && provider.legalName.length > 0) {
      return provider.legalName.shift() as string;
    }
    return '-';
  }
}

export type SpatialGroup = {
  type: string;
  coord: string;
};
