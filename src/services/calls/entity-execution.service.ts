import { Injectable } from '@angular/core';
import { Entity } from 'src/utility/enums/entity.enum';
import { State } from 'src/utility/enums/state.enum';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SnackbarService } from '../snackbar.service';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { ActionsService } from '../actions.service';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { Router } from '@angular/router';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { EntityStateManager } from './entityStateManager';
import { LoadingService } from '../loading.service';

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
      activeDataProduct.modified = new Date();

      if (activeDataProduct.state === State.DRAFT) {
        this.loadingService.setShowSpinner(true);
        this.apiService.endpoints[Entity.DATA_PRODUCT].update
          .call({
            ...activeDataProduct,
          })
          .then((data: DataProductDetailDataSource) => {
            this.snackbarService.openSnackbar('Successfully updated draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
            this.actionsService.disableSave();
            if (!this.actionsService.itemExists(data.instanceId)) {
              this.actionsService.addEditedItems([
                {
                  type: Entity.DATA_PRODUCT,
                  route: EntityEndpointValue.DATA_PRODUCT,
                  label: 'Data product',
                  state: State.DRAFT,
                  color: 'draft',
                  id: data.instanceId,
                },
              ]);
              this.actionsService.saveCurrentEdit(data.instanceId);
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
            state: State.DRAFT,
            instanceChangedId: activeDataProduct.instanceId,
          })
          .then((data: DataProductDetailDataSource) => {
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
                state: State.DRAFT,
                color: 'draft',
                id: data.instanceId,
              },
            ]);
            this.actionsService.saveCurrentEdit(data.instanceId);
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
      activeWebservice.dateModified = new Date();
      if (activeWebservice.state !== State.DRAFT) {
        activeWebservice.state = State.DRAFT;
        activeWebservice.instanceChangedId = activeWebservice.instanceId;
      }
      this.loadingService.setShowSpinner(true);
      this.apiService.endpoints[Entity.WEBSERVICE].update
        .call({
          ...activeWebservice,
        })
        .then((data: WebserviceDetailDataSource) => {
          this.snackbarService.openSnackbar('Successfully updated Webservice.', 'Close', 'success', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          if (!this.actionsService.itemExists(data.instanceId)) {
            this.actionsService.addEditedItems([
              {
                type: Entity.WEBSERVICE,
                route: EntityEndpointValue.WEBSERVICE,
                label: 'Webservice',
                state: State.DRAFT,
                color: 'draft',
                id: data.instanceId,
              },
            ]);
            this.actionsService.saveCurrentEdit(data.instanceId);
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
      if (activeDistribution.state !== State.DRAFT) {
        activeDistribution.state = State.DRAFT;
        activeDistribution.instanceChangedId = activeDistribution.instanceId;
      }
      this.loadingService.setShowSpinner(true);
      this.apiService.endpoints[Entity.DISTRIBUTION].update
        .call({
          ...activeDistribution,
        })
        .then((data: DistributionDetailDataSource) => {
          this.snackbarService.openSnackbar('Successfully updated Distribution.', 'Close', 'success', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          this.actionsService.showSaveDistributionMessage(false);
          if (!this.actionsService.itemExists(data.instanceId)) {
            this.actionsService.addEditedItems([
              {
                type: Entity.DISTRIBUTION,
                route: EntityEndpointValue.DISTRIBUTION,
                label: 'Distribution',
                state: State.DRAFT,
                color: 'draft',
                id: data.instanceId,
              },
            ]);
            this.actionsService.saveCurrentEdit(data.instanceId);
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
      if (operationData.state !== State.DRAFT) {
        operationData.state = State.DRAFT;
        operationData.instanceChangedId = operationData.instanceId;
      }
      this.loadingService.setShowSpinner(true);
      this.apiService.endpoints[Entity.OPERATION].update
        .call({
          ...operationData,
        })
        .then((data: OperationDetailDataSource) => {
          this.snackbarService.openSnackbar('Successfully updated Operation.', 'Close', 'success', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          const activeWebservice = this.webService.getValue();
          const newOperation: EntityDetail = {
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
            activeDistribution?.accessURL?.push(newOperation);
            this.setActiveDistribution(activeDistribution);
            this.actionsService.showSaveDistributionMessage(true);
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
      modified: new Date(),
      created: new Date(),
    };

    this.loadingService.setShowSpinner(true);
    this.apiService.endpoints.DataProduct.create
      .call(item)
      .then((value: DataProductDetailDataSource) => {
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
            state: State.DRAFT,
            color: 'draft',
            id: value.instanceId,
          },
        ]);
        this.actionsService.saveCurrentEdit(value.instanceId);
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
      publishedOrArchivedEntity.state = State.DRAFT;

      this.loadingService.setShowSpinner(true);
      this.apiService.endpoints.DataProduct.create
        .call(publishedOrArchivedEntity)
        .then((value: DataProductDetailDataSource) => {
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
              state: State.DRAFT,
              color: 'draft',
              id: value.instanceId,
            },
          ]);
          this.actionsService.saveCurrentEdit(value.instanceId);
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
