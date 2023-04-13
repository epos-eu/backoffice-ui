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

@Component({
  selector: 'app-dialog-submit',
  templateUrl: './dialog-submit-draft.component.html',
  styleUrls: ['./dialog-submit-draft.component.scss'],
})
export class DialogSubmitDraftComponent implements OnInit {
  public comment = new FormControl('', [Validators.required]);
  public currentEdit!: IChangeItem;

  constructor(
    private persistorService: PersistorService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
  ) {}

  ngOnInit(): void {
    this.actionsService.currentEditObservable.subscribe((edit) => {
      this.currentEdit = edit;
    });
  }

  public handleSubmit(): void {
    if (this.comment.valid) {
      const localStorage = this.persistorService.getValueFromStorage(
        StorageType.LOCAL_STORAGE,
        StorageKey.FORM_DATA_PRODUCT,
      );
      if (localStorage !== null) {
        const formData: DataProduct = JSON.parse(localStorage);
        this.apiService.endpoints[Entity.DATA_PRODUCT].putDataProductDetail
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
  }
}
