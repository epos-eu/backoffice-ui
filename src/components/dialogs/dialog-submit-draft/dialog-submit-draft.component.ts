import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { ActionsService } from 'src/services/actions.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { DialogService } from '../dialog.service';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { State } from 'src/utility/enums/state.enum';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { OperationsService } from 'src/services/operations.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../baseDialogService.abstract';

@Component({
  selector: 'app-dialog-submit',
  templateUrl: './dialog-submit-draft.component.html',
  styleUrls: ['./dialog-submit-draft.component.scss'],
})
export class DialogSubmitDraftComponent implements OnInit {
  public comment = new FormControl('', [Validators.required]);
  public currentEdit!: IChangeItem;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData<unknown>,
    private persistorService: PersistorService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
    private operationsService: OperationsService,
  ) {}

  ngOnInit(): void {
    console.debug(this.data);
    // this.activeEntity = this.persistorService.getValueFromStorage(
    //   StorageType.LOCAL_STORAGE,
    //   StorageKey.ACTIVE_ENTITY,
    // ) as Entity;
    this.actionsService.currentEditObservable.subscribe((edit) => {
      this.currentEdit = edit;
    });
  }

  public handleChangeProductState(entity: Entity, instanceId: string, state: State): void {
    if (this.comment.valid) {
      switch (entity) {
        case Entity.DATA_PRODUCT: {
          this.handleChangeDataProductState(instanceId, state);
          break;
        }
        case Entity.DISTRIBUTION: {
          this.handleDistributionSubmit();
          break;
        }
        case Entity.WEBSERVICE: {
          this.handleWebserviceSubmit();
          break;
        }
        case Entity.CONTACT_POINT: {
          this.handleContactPointSubmit();
          break;
        }
      }
    }
  }

  private handleDataProductSubmit() {
    const formData = this.operationsService.getActiveDataProductValue() as DataProduct;
    if (localStorage !== null) {
      this.apiService.endpoints[Entity.DATA_PRODUCT].updateState
        .call({
          instanceId: formData.instanceId as string,
          justThisOne: true,
          state: State.SUBMITTED,
        })
        .then(() => {
          this.actionsService.submitCurrentEdit(this.currentEdit.id);
          this.snackbarService.openSnackbar('New draft submitted successfully', 'Close', 'success', 5000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar('Error submitted draft, please try again later.', 'Close', 'error', 5000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        })
        .finally(() => {
          this.dialogService.closeDialog();
        });
    }
  }

  private handleChangeDataProductState(instanceId: string, state: State) {
    this.apiService.endpoints[Entity.DATA_PRODUCT].updateState
      .call({
        instanceId: instanceId,
        justThisOne: true,
        state: state,
      })
      .then(() => {
        this.actionsService.submitCurrentEdit(this.currentEdit.id);
        this.snackbarService.openSnackbar('New draft submitted successfully', 'Close', 'success', 5000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
      })
      .catch((err) => {
        console.error(err);
        this.snackbarService.openSnackbar('Error submitted draft, please try again later.', 'Close', 'error', 5000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]);
      })
      .finally(() => {
        this.dialogService.closeDialog();
      });
  }

  private handleWebserviceSubmit() {
    const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    if (localStorage !== null) {
      const formData: WebService = JSON.parse(localStorage);
      this.apiService.endpoints[Entity.WEBSERVICE].update
        .call({
          ...formData,
          datePublished: new Date(),
          identifier: [],
          state: State.SUBMITTED,
          supportedOperation: [],
          temporalExtent: [],
          changeComment: this.comment.value as string,
        })
        .then(() => {
          this.actionsService.submitCurrentEdit(this.currentEdit.id);
          this.snackbarService.openSnackbar('New draft saved successfully', 'Close', 'success', 5000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar('Error saving draft, please try again later.', 'Close', 'error', 5000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        })
        .finally(() => {
          this.dialogService.closeDialog();
        });
    }
  }

  private handleDistributionSubmit() {
    const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    if (localStorage !== null) {
      const formData: Distribution = JSON.parse(localStorage);
      this.apiService.endpoints[Entity.DISTRIBUTION].update
        .call({
          ...formData,
          state: State.SUBMITTED,
          changeComment: this.comment.value as string,
          // spatialExtent: undefined,
          // temporalExtent: undefined,
          // distribution: undefined,
          // contactPoint: undefined,
          // metaId: 'test meta id',
        })
        .then(() => {
          this.actionsService.submitCurrentEdit(this.currentEdit.id);
          this.snackbarService.openSnackbar('New draft saved successfully', 'Close', 'success', 5000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar('Error saving draft, please try again later.', 'Close', 'error', 5000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        })
        .finally(() => {
          this.dialogService.closeDialog();
        });
    }
  }

  private handleContactPointSubmit() {
    const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    if (localStorage !== null) {
      const formData: ContactPoint = JSON.parse(localStorage);
      this.apiService.endpoints[Entity.CONTACT_POINT].update
        .call({
          ...formData,
          state: State.SUBMITTED,
        })
        .then(() => {
          this.actionsService.submitCurrentEdit(this.currentEdit.id);
          this.snackbarService.openSnackbar('New draft saved successfully', 'Close', 'success', 5000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar('Error saving draft, please try again later.', 'Close', 'error', 5000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        })
        .finally(() => {
          this.dialogService.closeDialog();
        });
    }
  }
}
