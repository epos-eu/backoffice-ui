import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DataProductsDataSource } from 'src/apiAndObjects/objects/dataProductsDataSource';
import { Status } from 'src/apiAndObjects/objects/enums/actions.enum';
import { SpatialExtent } from 'src/apiAndObjects/objects/types/spatialExtent.type';
import { TemporalExtent } from 'src/apiAndObjects/objects/types/temporalExtent.type';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { RevisionsComponent } from 'src/components/dialogs/revisions/revisions.component';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { ActionsService } from 'src/services/actions.service';

@Component({
  selector: 'app-browse-data-products-item',
  templateUrl: './browse-data-products-item.component.html',
  styleUrls: ['./browse-data-products-item.component.scss'],
})
export class BrowseDataProductsItemComponent implements OnInit, OnDestroy {
  public floatLabelControl = new UntypedFormControl('auto');
  public dataProduct!: DataProductsDataSource | undefined;
  public UID!: string | null;
  public currentEdit!: IChangeItem;
  public form!: UntypedFormGroup;

  constructor(
    private dialogService: DialogService,
    private actionService: ActionsService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
  ) {
    this.UID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((obs) => {
      if (null != obs.get('id')) {
        this.initData(obs.get('id') as string);
      }
    });
  }

  ngOnDestroy(): void {
    this.actionService.cancelLiveEdit();
  }

  private initData(id: string): void {
    this.apiService.endpoints.dataProducts.getDataProductDetail
      .call(
        {
          instanceId: id,
        },
        false,
      )
      .then((data: Array<DataProductsDataSource>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.dataProduct = data.shift();

          if (this.dataProduct) {
            this.actionService.setLiveEdit();
            this.actionService.addEditedItems([
              {
                type: 'data-products',
                label: 'Data product',
                status: Status.Draft,
                color: 'draft',
                id: this.dataProduct.instanceId,
              },
            ]);
            this.trackFormData();
            this.patch('spatialExtent');
            this.patch('temporalExtent');
            this.actionService.trackCurrentEdit(this.dataProduct.uid);
            this.actionService.currentEditObservable.subscribe((item: IChangeItem) => {
              if (item) {
                this.currentEdit = item;
              }
            });
          }
        }
      });
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      uid: this.dataProduct?.uid,
      title: this.dataProduct?.title,
      description: this.dataProduct?.description,
      changeTimestamp: this.dataProduct?.changeTimestamp,
      state: this.dataProduct?.state,
      issued: this.dataProduct?.issued,
      keywords: this.dataProduct?.keywords,
      modified: this.dataProduct?.modified,
      versionInfo: this.dataProduct?.versionInfo,
      created: this.dataProduct?.created.format(),
      spatialExtent: this.formBuilder.array([]),
      temporalExtent: this.formBuilder.array([]),
      distributionUid: this.dataProduct?.distribution[0]['uid'],
      distributionTitle: '',
      webserviceUid: '',
      webserviceTitle: '',
      contactPointUid: '',
      contactPointTitle: '',
    });
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  private patch(field: string): void {
    const control = <FormArray>this.form.get(field);
    if (this.dataProduct) {
      switch (true) {
        case field === 'spatialExtent':
          this.dataProduct.spatialExtent.forEach((item: SpatialExtent) => {
            control.push(this.patchValues('Location', item.location));
          });
          break;
        case field === 'temporalExtent':
          this.dataProduct.temporalExtent.forEach((item: TemporalExtent) => {
            control.push(this.patchValues('Period', `${item.startDate} - ${item.endDate ? item.endDate : 'Now'}`));
          });
      }
    }
  }

  private patchValues(label: string, value: string) {
    return this.formBuilder.group({
      label: [label],
      value: [value],
    });
  }

  public handleGetRevisions(): void {
    // Todo: pass revisions data to component
    this.dialogService.openDialogForComponent(RevisionsComponent, {}, '50vw', '70vh');
  }

  public handleDelete(): void {
    // Todo: delete item from DB
    this.dialogService.handleDelete();
  }

  public handleBack(): void {
    this.router.navigate(['/browse/data-products']);
  }
}
