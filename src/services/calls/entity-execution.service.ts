import { Injectable } from '@angular/core';
import { Entity } from 'src/utility/enums/entity.enum';
import { Status } from 'src/utility/enums/status.enum';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SnackbarService } from '../snackbar.service';
import { ActionsService } from '../actions.service';
import { Router } from '@angular/router';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { EntityStateManager } from './entityStateManager';
import { LoadingService } from '../loading.service';
import { DataProduct, Distribution, LinkedEntity, Operation, WebService } from 'generated/backofficeSchemas';

@Injectable({
  providedIn: 'root',
})
export class EntityExecutionService extends EntityStateManager {
  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
    private router: Router,
    private loadingService: LoadingService,
  ) {
    super();
  }

  /**
   * The `handleDataProductSave` function updates or creates a draft of a data product and performs
   * various actions based on the result.
   */
  public handleDataProductSave(): void {
    const activeDataProduct = this.getActiveDataProductValue();
    if (null != activeDataProduct) {
      activeDataProduct.modified = '';

      if (activeDataProduct.status === Status.DRAFT) {
        this.loadingService.setShowSpinner(true);
        this.apiService.endpoints[Entity.DATA_PRODUCT].update
          .call({
            ...activeDataProduct,
          })
          .then((data: DataProduct) => {
            this.snackbarService.openSnackbar('Successfully updated draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
            this.actionsService.disableSave();
            if (!this.actionsService.itemExists(data.instanceId as string)) {
              // this.actionsService.addEditedItems([
              //   {
              //     type: Entity.DATA_PRODUCT,
              //     route: EntityEndpointValue.DATA_PRODUCT,
              //     label: 'Data product',
              //     state: Status.DRAFT,
              //     color: 'draft',
              //     id: data.instanceId,
              //   },
              // ]);
              this.actionsService.saveCurrentEdit(data.instanceId as string);
            }

            // Timeout for more consistent navigation
            setTimeout(() => {
              this.router.navigate([
                `/browse/${EntityEndpointValue.DATA_PRODUCT}/details`,
                data.metaId,
                data.instanceId,
              ]);
            }, 100);
          })
          .catch((err) => {
            console.error(err);
            this.snackbarService.openSnackbar('Error updating draft.', 'Close', 'error', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-error',
            ]);
          })
          .finally(() => {
            this.loadingService.setShowSpinner(false);
          });
      } else {
        this.loadingService.setShowSpinner(true);
        this.apiService.endpoints[Entity.DATA_PRODUCT].update
          .call({
            ...activeDataProduct,
            status: Status.DRAFT,
            instanceChangedId: activeDataProduct.instanceId,
          })
          .then((data: DataProduct) => {
            this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
            this.actionsService.disableSave();
            this.actionsService.addEditedItems([
              {
                type: Entity.DATA_PRODUCT,
                route: EntityEndpointValue.DATA_PRODUCT,
                label: 'Data product',
                status: Status.DRAFT,
                color: 'draft',
                id: data.instanceId as string,
              },
            ]);
            this.actionsService.saveCurrentEdit(data.instanceId as string);
          })
          .catch((err) => {
            console.error(err);
            this.snackbarService.openSnackbar('Error creating new draft', 'Close', 'error', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-error',
            ]);
          })
          .finally(() => {
            this.loadingService.setShowSpinner(false);
          });
      }
    }
  }

  public handleWebserviceSave(): void {
    const activeWebservice = this.getActiveWebServiceValue();
    if (activeWebservice !== null) {
      activeWebservice.dateModified = '';
      if (activeWebservice.status !== Status.DRAFT) {
        activeWebservice.status = Status.DRAFT;
        activeWebservice.instanceChangedId = activeWebservice.instanceId;
      }
      this.loadingService.setShowSpinner(true);
      this.apiService.endpoints[Entity.WEBSERVICE].update
        .call({
          ...activeWebservice,
        })
        .then((data: WebService) => {
          this.snackbarService.openSnackbar('Successfully updated Webservice.', 'Close', 'success', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          if (!this.actionsService.itemExists(data.instanceId as string)) {
            this.actionsService.addEditedItems([
              {
                type: Entity.WEBSERVICE,
                route: EntityEndpointValue.WEBSERVICE,
                label: 'Webservice',
                status: Status.DRAFT,
                color: 'draft',
                id: data.instanceId as string,
              },
            ]);
            this.actionsService.saveCurrentEdit(data.instanceId as string);
          }
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar('Error updating Webservice.', 'Close', 'error', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        })
        .finally(() => {
          this.loadingService.setShowSpinner(false);
        });
    }
  }

  public handleDistributionSave(): void {
    const activeDistribution: Distribution = this.getActiveDistributionValue() as Distribution;
    if (activeDistribution) {
      activeDistribution.modified = new Date().toISOString();
      if (activeDistribution.status !== Status.DRAFT) {
        activeDistribution.status = Status.DRAFT;
        activeDistribution.instanceChangedId = activeDistribution.instanceId;
      }
      this.loadingService.setShowSpinner(true);
      this.apiService.endpoints[Entity.DISTRIBUTION].update
        .call({
          ...activeDistribution,
        })
        .then((data: Distribution) => {
          this.snackbarService.openSnackbar('Successfully updated Distribution.', 'Close', 'success', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          this.actionsService.showSaveDistributionMessage(false);
          if (!this.actionsService.itemExists(data.instanceId as string)) {
            this.actionsService.addEditedItems([
              {
                type: Entity.DISTRIBUTION,
                route: EntityEndpointValue.DISTRIBUTION,
                label: 'Distribution',
                status: Status.DRAFT,
                color: 'draft',
                id: data.instanceId as string,
              },
            ]);
            this.actionsService.saveCurrentEdit(data.instanceId as string);
          }
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar('Error updating Distribution.', 'Close', 'error', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        })
        .finally(() => {
          this.loadingService.setShowSpinner(false);
        });
    }
  }

  public handleOperationSave(): void {
    const operationData = this.getActiveOperationValue();
    if (operationData !== null) {
      if (operationData.status !== Status.DRAFT) {
        operationData.status = Status.DRAFT;
        operationData.instanceChangedId = operationData.instanceId;
      }
      this.loadingService.setShowSpinner(true);
      this.apiService.endpoints[Entity.OPERATION].update
        .call({
          ...operationData,
        })
        .then((data: Operation) => {
          this.snackbarService.openSnackbar('Successfully updated Operation.', 'Close', 'success', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          const activeWebservice = this.webService.getValue();
          const newOperation: LinkedEntity = {
            entityType: Entity.OPERATION,
            instanceId: data.instanceId,
            metaId: data.metaId,
            uid: data.uid,
          };
          if (null != activeWebservice) {
            activeWebservice.supportedOperation = [];
            activeWebservice.supportedOperation.push(newOperation);
            this.setActiveWebService(activeWebservice);
          }

          // Sets 'accessURL' on Distribution to newly created Operation.
          const activeDistribution = this.getActiveDistributionValue();
          if (activeDistribution != null) {
            activeDistribution.accessURL = [];
            // activeDistribution?.accessURL?.push(newOperation);
            this.setActiveDistribution(activeDistribution);
          }
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar('Error updating Operation.', 'Close', 'error', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        })
        .finally(() => {
          this.loadingService.setShowSpinner(false);
        });
    }
  }

  public handleCreateDataProduct(): void {
    const item: DataProduct = {
      uid: 'temp-uid-to-be-generated',
      modified: '',
      created: '',
    };

    this.loadingService.setShowSpinner(true);
    this.apiService.endpoints.DataProduct.create
      .call(item)
      .then((value: DataProduct) => {
        this.router.navigate([`/browse/${EntityEndpointValue.DATA_PRODUCT}/details`, value.metaId, value.instanceId]);
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'close', 'success', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
        this.actionsService.addEditedItems([
          {
            type: Entity.DATA_PRODUCT,
            route: EntityEndpointValue.DATA_PRODUCT,
            label: 'Data product',
            status: Status.DRAFT,
            color: 'draft',
            id: value.instanceId as string,
          },
        ]);
        this.actionsService.saveCurrentEdit(value.instanceId as string);
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: failed to create new Data Product`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      )
      .finally(() => {
        this.loadingService.setShowSpinner(false);
      });
  }

  public handleCreateDataProductFromPublishedOrArchivedEntity(): void {
    const publishedOrArchivedEntity = this.getActiveDataProductValue();

    if (publishedOrArchivedEntity) {
      publishedOrArchivedEntity.instanceChangedId = publishedOrArchivedEntity.instanceId;
      publishedOrArchivedEntity.instanceId = undefined; // Handled by backend
      publishedOrArchivedEntity.status = Status.DRAFT;

      this.loadingService.setShowSpinner(true);
      this.apiService.endpoints.DataProduct.create
        .call(publishedOrArchivedEntity)
        .then((value: DataProduct) => {
          this.snackbarService
            .openSnackbar(`Success: ${value.uid} created`, 'View', 'success', 6000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ])
            .afterDismissed()
            .subscribe(() => {
              this.router.navigate(['/browse/dataproduct/details', value.metaId, value.instanceId]);
            });
          this.actionsService.addEditedItems([
            {
              type: Entity.DATA_PRODUCT,
              route: EntityEndpointValue.DATA_PRODUCT,
              label: 'Data product',
              status: Status.DRAFT,
              color: 'draft',
              id: value.instanceId as string,
            },
          ]);
          this.actionsService.saveCurrentEdit(value.instanceId as string);
        })
        .catch(() =>
          this.snackbarService.openSnackbar(`Error: failed to create new Data Product`, 'close', 'error', 6000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]),
        )
        .finally(() => {
          this.loadingService.setShowSpinner(false);
        });
    }
  }
}
