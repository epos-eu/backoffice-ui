import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Category, DataProduct, LinkedEntity } from 'generated/backofficeSchemas';
import { map } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { Status } from 'src/utility/enums/status.enum';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  @Input() dataProduct!: DataProduct;

  public form!: FormGroup;

  public selectedCategories: Array<Category> = [];

  public stateEnum = Status;

  public categories: Array<Category> = [];

  public loading = false;

  public disabled = false;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {}
  public ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    if (this.categories.length === 0) {
      this.loading = true;
      this.apiService.endpoints.Category.getAll.call().then((response: Category[]) => {
        this.categories = response;
        this.loading = false;
        this.selectedCategories = response.filter((category: Category) => {
          return this.dataProduct?.category?.some((value: LinkedEntity) => {
            return category.uid === value.uid;
          });
        });
        this.initForm();
      });
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      category: new FormControl(),
    });
    if (this.dataProduct?.status === Status.PUBLISHED || this.dataProduct?.status === Status.ARCHIVED) {
      this.form.disable();
      this.disabled = true;
    }
    this.trackFormChanges();
  }

  private trackFormChanges(): void {
    this.form.valueChanges
      .pipe(
        map((changes) => {
          const providers = changes['category'];
          return providers.map((provider: Category) => ({
            uid: provider.uid,
            metaId: provider.metaId,
            instanceId: provider.instanceId,
            entityType: Entity.CATEGORY,
          }));
        }),
      )
      .subscribe((categories: Category[]) => {
        categories.forEach((category: LinkedEntity, index: number) => {
          if (Array.isArray(this.dataProduct?.category) && this.categories[index] != null) {
            this.dataProduct.category[index] = category;
          }
        });
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public compareWithFn(optionOne: any, optionTwo: any): boolean {
    if (optionOne.metaId === optionTwo.metaId) {
      return true;
    }
    return false;
  }
}
