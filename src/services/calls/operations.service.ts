import { Injectable } from '@angular/core';
import { PersistorService, StorageType } from '../persistor.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { State } from 'src/utility/enums/state.enum';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SnackbarService } from '../snackbar.service';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { ActionsService } from '../actions.service';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { Router } from '@angular/router';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { CallHelper } from './callHelper';

@Injectable({
  providedIn: 'root',
})
export class OperationsService extends CallHelper {
  constructor(
    private persistorService: PersistorService,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
    private router: Router,
  ) {
    super();
  }

  public handleDataProductSave(): void {
    const formData = this.getActiveDataProductValue();
    if (null != formData) {
      formData.modified = new Date();
      formData.instanceChangedId = undefined;

      if (formData.state === State.DRAFT) {
        this.apiService.endpoints[Entity.DATA_PRODUCT].update
          .call({
            ...formData,
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
          });
      } else {
        this.apiService.endpoints[Entity.DATA_PRODUCT].update
          .call({
            ...formData,
            state: State.DRAFT,
            instanceChangedId: formData.instanceId,
            metaId: formData.metaId,
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
            this.snackbarService.openSnackbar('Error creating new draft', 'Close', 'error', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-error',
            ]);
          });
      }
    }
  }

  public handleWebserviceSave(): void {
    const formData = this.getActiveWebServiceValue();
    if (formData !== null) {
      formData.dateModified = new Date();
      if (formData.state !== State.DRAFT) {
        formData.instanceChangedId = formData.instanceId;
        formData.instanceId = undefined;
      } else {
        (formData.state = State.DRAFT), (formData.instanceChangedId = formData.instanceId);
      }
      this.apiService.endpoints[Entity.WEBSERVICE].update
        .call({
          ...formData,
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
        });
    }
  }

  public handleDistributionSave(): void {
    const formData: Distribution = this.getActiveDistributionValue() as Distribution;
    if (formData) {
      if (formData.state === State.DRAFT) {
        formData.instanceChangedId = undefined;
        // formData.instanceId = undefined;
      } else {
        (formData.state = State.DRAFT), (formData.instanceChangedId = formData.instanceId);
      }
      formData.modified = new Date().toISOString();
      this.apiService.endpoints[Entity.DISTRIBUTION].update
        .call({
          ...formData,
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
        });
    }
  }

  public handleContactPointSave(): void {
    const localStorage = this.persistorService.getValueFromStorage(
      StorageType.LOCAL_STORAGE,
      StorageKey.ACTIVE_CONTACT_FORM_DATA,
    );
    if (localStorage !== null) {
      const formData: ContactPoint = JSON.parse(localStorage);
      // if (formData.state === State.DRAFT) {
      this.apiService.endpoints[Entity.CONTACT_POINT].update
        .call({
          ...formData,
        })
        .then((data: ContactPointDetailDataSource) => {
          this.snackbarService.openSnackbar('Successfully updated Contact Point.', 'Close', 'success', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
          if (!this.actionsService.itemExists(data.instanceId)) {
            this.actionsService.addEditedItems([
              {
                type: Entity.CONTACT_POINT,
                route: EntityEndpointValue.CONTACT_POINT,
                label: 'Contact Point',
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
          this.snackbarService.openSnackbar('Error updating Contact Point.', 'Close', 'error', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        });
      // } else {
      // this.apiService.endpoints[Entity.CONTACT_POINT].create
      //   .call({
      //     ...formData,
      //     state: State.DRAFT,
      //   })
      //   .then((data: ContactPointDetailDataSource) => {
      //     this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
      //       'snackbar',
      //       'mat-toolbar',
      //       'snackbar-success',
      //     ]);
      //     this.actionsService.addEditedItems([
      //       {
      //         type: Entity.CONTACT_POINT,
      //         route: EntityEndpointValue.CONTACT_POINT,
      //         label: 'Contact Point',
      //         state: State.DRAFT,
      //         color: 'draft',
      //         id: data.instanceId,
      //       },
      //     ]);
      //     this.actionsService.saveCurrentEdit(data.instanceId);
      //     // this.itemsExist.next(true);
      //     this.actionsService.disableSave();
      //     this.router.navigate([`/browse/${EntityEndpointValue.CONTACT_POINT}/details`, data.instanceId]);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     this.snackbarService.openSnackbar('Error creating new draft', 'Close', 'error', 3000, [
      //       'snackbar',
      //       'mat-toolbar',
      //       'snackbar-error',
      //     ]);
      //   });
      // }
    }
  }

  public handleOperationSave(): void {
    const operationData = this.getActiveOperationValue();
    if (operationData !== null) {
      if (operationData.state === State.DRAFT) {
        operationData.instanceChangedId = undefined;
        // formData.instanceId = undefined;
      } else {
        operationData.state = State.DRAFT;
        operationData.instanceChangedId = operationData.instanceId;
      }
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
            this.actionsService;
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
        });
    }
  }
}
