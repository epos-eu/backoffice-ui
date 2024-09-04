import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Category, DataProduct, LinkedEntity } from 'generated/backofficeSchemas';
import { map } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
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

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private entityExecutionService: EntityExecutionService,
  ) {}
  public ngOnInit(): void {
    this.initData();
    this.initForm();
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
        this.form.controls['category'].setValue(this.selectedCategories);
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
          const category = changes['category'];
          return category.map((category: Category) => ({
            uid: category.uid,
            metaId: category.metaId,
            instanceId: category.instanceId,
            entityType: Entity.CATEGORY,
          }));
        }),
      )
      .subscribe((categories: Category[]) => {
        categories.forEach((category: LinkedEntity, index: number) => {
          if (Array.isArray(this.dataProduct?.category) && this.categories[index] != null) {
            this.dataProduct.category[index] = category;
            const activeDataProduct = this.entityExecutionService.getActiveDataProductValue();
            if (activeDataProduct) {
              activeDataProduct.category = categories;
            }
          }
        });
      });
  }
}
