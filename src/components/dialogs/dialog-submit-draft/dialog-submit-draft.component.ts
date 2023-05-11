import { Component, OnInit } from '@angular/core';
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
import { SaveWebserviceBody } from 'src/apiAndObjects/api/webservice/postWebserviceDetail';
import { State } from 'src/utility/enums/state.enum';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';

@Component({
  selector: 'app-dialog-submit',
  templateUrl: './dialog-submit-draft.component.html',
  styleUrls: ['./dialog-submit-draft.component.scss'],
})
export class DialogSubmitDraftComponent implements OnInit {
  public comment = new FormControl('', [Validators.required]);
  public currentEdit!: IChangeItem;
  private activeEntity = '';

  constructor(
    private persistorService: PersistorService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
  ) {}

  ngOnInit(): void {
    this.activeEntity = this.persistorService.getValueFromStorage(
      StorageType.LOCAL_STORAGE,
      StorageKey.ACTIVE_ENTITY,
    ) as Entity;
    this.actionsService.currentEditObservable.subscribe((edit) => {
      this.currentEdit = edit;
    });
  }

  public handleSubmit(): void {
    if (this.comment.valid) {
      switch (this.activeEntity as Entity) {
        case Entity.DATA_PRODUCT: {
          this.handleDataProductSubmit();
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
      }
    }
  }

  private handleDataProductSubmit() {
    const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    if (localStorage !== null) {
      const formData: DataProduct = JSON.parse(localStorage);
      this.apiService.endpoints[Entity.DATA_PRODUCT].update
        .call({
          ...formData,
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

  private handleWebserviceSubmit() {
    const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    if (localStorage !== null) {
      const formData: SaveWebserviceBody = JSON.parse(localStorage);
      this.apiService.endpoints[Entity.WEBSERVICE].update
        .call({
          ...formData,
          datePublished: undefined,
          identifier: undefined,
          state: State.DRAFT,
          supportedOperation: undefined,
          temporalExtent: undefined,
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
          changeComment: this.comment.value as string,
          spatialExtent: undefined,
          temporalExtent: undefined,
          distribution: undefined,
          contactPoint: undefined,
          metaId: 'test meta id',
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
