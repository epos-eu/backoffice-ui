import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DataProductsDataSource } from 'src/apiAndObjects/objects/dataProductsDataSource';
import { Status } from 'src/apiAndObjects/objects/enums/actions.enum';
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
      .call({
        instanceId: id,
      })
      .then((data: Array<DataProductsDataSource>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.dataProduct = data.shift();

          if (this.dataProduct) {
            this.actionService.setLiveEdit();
            this.actionService.addEditedItems([
              {
                type: 'data-products',
                label: 'Data product',
                status: this.dataProduct.state as Status,
                color: this.dataProduct.state.toLowerCase(),
                id: this.dataProduct.instanceId,
              },
            ]);
            this.trackFormData();
            // this.actionService.trackCurrentEdit(this.dataProduct.uid);
            // this.actionService.currentEditObservable.subscribe((item: IChangeItem) => {
            //   if (item) {
            //     this.currentEdit = item;
            //   }
            // });
          }
        }
      });
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      uid: this.dataProduct?.uid,
      title: this.dataProduct?.title,
      description: this.dataProduct?.description,
      distributionUid: this.dataProduct?.distribution[0]['uid'],
      distributionTitle: '',
      webserviceUid: '',
      webserviceTitle: '',
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
}
