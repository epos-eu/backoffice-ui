import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Category, CategoryScheme, DataProduct, LinkedEntity } from 'generated/backofficeSchemas';
import { map } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';
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

  public selectedCategoryScheme: CategoryScheme | undefined;

  public categorySchemes: Array<CategoryScheme> = [];

  public stateEnum = Status;

  public categories: Array<Category> = [];

  public unfilteredCategories: Array<Category> = [];

  public loading = false;

  public disabled = false;

  public disableSchemeSelect = false;

  constructor(
    private readonly apiService: ApiService,
    private readonly formBuilder: FormBuilder,
    private readonly entityExecutionService: EntityExecutionService,
    private readonly snackbarService: SnackbarService,
  ) {}
  public ngOnInit(): void {
    this.initData();
    this.initForm();
  }

  private initData(): void {
    // Get all category schemes.
    this.apiService.endpoints.CategoryScheme.getAll.call().then((response: CategoryScheme[]) => {
      this.categorySchemes = response;
    });

    if (this.categories.length === 0) {
      this.loading = true;
      this.apiService.endpoints.Category.getAll
        .call()
        .then((response: Category[]) => {
          this.selectedCategories = response.filter((category: Category) => {
            return this.dataProduct?.category?.some((value: LinkedEntity) => {
              return category.uid === value.uid;
            });
          });
          this.selectedCategories.length > 0 ? (this.disableSchemeSelect = true) : (this.disableSchemeSelect = false);

          this.unfilteredCategories = response;
          if (this.selectedCategories.length > 0) {
            // If there is a selected category, filter the categories based on the selectedCategories CATEGORY_SCHEME.
            this.categories = response.filter(
              (category: Category) => category.inScheme?.metaId === this.selectedCategories[0].inScheme?.metaId,
            );
            this.selectedCategoryScheme = this.categorySchemes.find(
              (categoryScheme: CategoryScheme) => categoryScheme.uid === this.selectedCategories[0].inScheme?.uid,
            );
            this.loading = false;
            // if there no selected categories, let user choose category scheme and subsequent category
          } else {
            this.updateCategories(this.unfilteredCategories);
          }

          this.form.controls['category'].setValue(this.selectedCategories);
        })
        .catch(() => (this.loading = false));
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      category: new FormControl(),
      categoryScheme: new FormControl(),
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
          if (null != category) {
            return category.map((category: Category) => ({
              uid: category.uid,
              metaId: category.metaId,
              instanceId: category.instanceId,
              entityType: Entity.CATEGORY,
            }));
          }
        }),
      )
      .subscribe((categories: Category[]) => {
        if (null != categories) {
          categories.forEach((category: LinkedEntity, index: number) => {
            if (Array.isArray(this.dataProduct?.category) && this.categories[index] != null) {
              this.dataProduct.category[index] = category;
              const activeDataProduct = this.entityExecutionService.getActiveDataProductValue();
              if (activeDataProduct) {
                activeDataProduct.category = categories;
              }
            }
          });

          if (categories.length === 0) {
            const activeDataProduct = this.entityExecutionService.getActiveDataProductValue();
            if (activeDataProduct) {
              activeDataProduct.category = [];
            }
          }
        }
      });
  }

  public updateCategories(categories: Array<Category>): void {
    this.categories = categories.filter(
      (category: Category) => category.inScheme?.uid === this.selectedCategoryScheme?.uid,
    );
    this.loading = false;
  }

  public notifyChange(): void {
    this.selectedCategories.length > 0 ? (this.disableSchemeSelect = true) : (this.disableSchemeSelect = false);
    this.snackbarService.openSnackbar(`Please save.`, 'close', SnackbarType.WARNING, 3000, [
      'snackbar',
      'mat-toolbar',
      'snackbar-warning',
    ]);
  }
}
