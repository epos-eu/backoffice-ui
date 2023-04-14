import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SaveDataProductBody } from 'src/apiAndObjects/api/data-products/postDataProductDetails';
import { DataProductDataSource } from 'src/apiAndObjects/objects/dataProductDataSource';
import { DataProductsDataSource } from 'src/apiAndObjects/objects/dataProductsDataSource';
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
    const item: SaveDataProductBody = {
      uid: this.form.value['uid'],
    };

    this.apiService.endpoints.DataProduct.postDataProductDetail
      .call(item)
      .then((value: DataProductDataSource) => {
        this.router.navigate(['/browse/data-products/details', value.instanceId]);
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'close', 'success', 6000);
      })
      .catch(() => this.snackbarService.openSnackbar(`Error: failed to create new Data Product`, 'close', 'error'))
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
