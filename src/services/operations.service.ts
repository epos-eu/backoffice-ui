import { Injectable } from '@angular/core';
import { PersistorService, StorageType } from './persistor.service';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { Entity } from 'src/utility/enums/entity.enum';
import { State } from 'src/utility/enums/state.enum';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SnackbarService } from './snackbar.service';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  constructor(
    private persistorService: PersistorService,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
  ) {}

  public handleDataProductSave(): void {
    const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    if (localStorage !== null) {
      const formData: DataProduct = JSON.parse(localStorage);
      if (formData.state === State.DRAFT) {
        this.apiService.endpoints[Entity.DATA_PRODUCT].update
          .call({
            ...formData,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully updated draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
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
        this.apiService.endpoints[Entity.DATA_PRODUCT].create
          .call({
            ...formData,
            state: State.DRAFT,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
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
    const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    if (localStorage !== null) {
      const formData: WebService = JSON.parse(localStorage);
      if (formData.state === State.DRAFT) {
        this.apiService.endpoints[Entity.WEBSERVICE].update
          .call({
            ...formData,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully updated draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
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
        this.apiService.endpoints.Webservice.create
          .call({
            ...formData,
            datePublished: new Date(),
            identifier: [],
            state: State.DRAFT,
            supportedOperation: [],
            temporalExtent: [],
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
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

  public handleDistributionSave(): void {
    const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    if (localStorage !== null) {
      const formData: Distribution = JSON.parse(localStorage);
      if (formData.state === State.DRAFT) {
        this.apiService.endpoints[Entity.DISTRIBUTION].update
          .call({
            ...formData,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully updated draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
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
        console.debug('should be seting state');
        this.apiService.endpoints[Entity.DISTRIBUTION].create
          .call({
            ...formData,
            state: State.DRAFT,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
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

  public handleContactPointSave(): void {
    const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    if (localStorage !== null) {
      const formData: ContactPoint = JSON.parse(localStorage);
      if (formData.state === State.DRAFT) {
        this.apiService.endpoints[Entity.CONTACT_POINT].update
          .call({
            ...formData,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully updated draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
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
        this.apiService.endpoints[Entity.CONTACT_POINT].create
          .call({
            ...formData,
            state: State.DRAFT,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
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
}
