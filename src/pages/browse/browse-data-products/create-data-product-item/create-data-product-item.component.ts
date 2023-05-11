import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DataProductDataSource } from 'src/apiAndObjects/objects/dataProductDataSource';
import { DataProductsDataSource } from 'src/apiAndObjects/objects/dataProductsDataSource';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { SnackbarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-create-data-product-item',
  templateUrl: './create-data-product-item.component.html',
  styleUrls: ['./create-data-product-item.component.scss'],
})
export class CreateDataProductItemComponent implements OnInit {
  public form!: UntypedFormGroup;
  public dataProduct!: DataProductsDataSource | undefined;
  public floatLabelControl = new UntypedFormControl('auto');
  public loading = false;

  public enableSave = false;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.trackFormData();
  }

  public handleBack(): void {
    this.router.navigate(['/browse/data-products']);
  }

  public handleCreate(): void {
    this.loading = true;
    const item: DataProduct = {
      uid: this.form.value['uid'],
      modified: new Date().toISOString(),
    };

    this.apiService.endpoints.DataProduct.create
      .call(item)
      .then((value: DataProductDataSource) => {
        this.router.navigate(['/browse/data-products/details', value.instanceId]);
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'close', 'success', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: failed to create new Data Product`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      )
      .finally(() => (this.loading = false));
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      uid: this.dataProduct?.uid,
    });
    this.form.valueChanges.subscribe(() => {
      this.enableSave = this.form.valid;
    });
  }
}
