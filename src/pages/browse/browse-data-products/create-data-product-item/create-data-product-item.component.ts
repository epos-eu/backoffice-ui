import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SaveDataProductBody } from 'src/apiAndObjects/api/data-products/postDataProductDetails';
import { DataProductsDataSource } from 'src/apiAndObjects/objects/dataProductsDataSource';

@Component({
  selector: 'app-create-data-product-item',
  templateUrl: './create-data-product-item.component.html',
  styleUrls: ['./create-data-product-item.component.scss'],
})
export class CreateDataProductItemComponent implements OnInit {
  public form!: UntypedFormGroup;
  public dataProduct!: DataProductsDataSource | undefined;
  public floatLabelControl = new UntypedFormControl('auto');

  public enableSave = false;

  constructor(private router: Router, private formBuilder: UntypedFormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.trackFormData();
  }

  public handleBack(): void {
    this.router.navigate(['/browse/data-products']);
  }

  public handleCreate(): void {
    const item: SaveDataProductBody = {
      uid: this.form.value['uid'],
    };

    this.apiService.endpoints.DataProduct.postDataProductDetail.call(item).then(() => {
      console.debug('Success');
    });
    console.debug(this.form.value['uid']);
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      uid: this.dataProduct?.uid,
    });
    this.form.valueChanges.subscribe((value) => {
      this.enableSave = this.form.valid;
    });
  }
}
