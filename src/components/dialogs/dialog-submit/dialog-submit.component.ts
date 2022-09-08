import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SaveDataProductBody } from 'src/apiAndObjects/api/data-products/postDataProductDetails';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { SectionName } from 'src/utility/enums/sectionName.enum';
import { State } from 'src/utility/enums/state.enum';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-dialog-submit',
  templateUrl: './dialog-submit.component.html',
  styleUrls: ['./dialog-submit.component.scss'],
})
export class DialogSubmitComponent {
  public comment = new FormControl('', [Validators.required]);

  constructor(
    private persistorService: PersistorService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
  ) {}

  public handleSubmit(): void {
    if (this.comment.valid) {
      const localStorage = this.persistorService.getValueFromStorage(
        StorageType.LOCAL_STORAGE,
        StorageKey.FORM_DATA_PRODUCT,
      );
      if (localStorage !== null) {
        const formData: DataProduct = JSON.parse(localStorage);
        this.apiService.endpoints.dataProducts.postDataProductDetail
          .call({
            comment: this.comment.value as string,
            dataProduct: formData,
            distributions: [],
            webServices: [],
            operations: [],
            contactPoints: [],
          })
          .then((response: any) => {
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
