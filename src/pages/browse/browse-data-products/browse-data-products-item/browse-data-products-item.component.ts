import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { RevisionsComponent } from 'src/components/dialogs/revisions/revisions.component';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { ActionsService } from 'src/services/actions.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Entity } from 'src/utility/enums/entity.enum';
import { HelpersService } from 'src/services/helpers.service';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { Status } from 'src/apiAndObjects/objects/enums/actions.enum';

@Component({
  selector: 'app-browse-data-products-item',
  templateUrl: './browse-data-products-item.component.html',
  styleUrls: ['./browse-data-products-item.component.scss'],
})
export class BrowseDataProductsItemComponent implements OnInit, OnDestroy {
  public floatLabelControl = new UntypedFormControl('auto');
  public dataProduct!: DataProductDetailDataSource | undefined;
  public UID!: string | null;
  public currentEdit!: IChangeItem;
  public form!: UntypedFormGroup;
  public entityRoute = EntityEndpointValue.DATA_PRODUCT;

  constructor(
    private dialogService: DialogService,
    private actionService: ActionsService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private persistorService: PersistorService,
  ) {
    this.UID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.persistorService.setValueInStorage(StorageType.LOCAL_STORAGE, StorageKey.ACTIVE_ENTITY, Entity.DATA_PRODUCT);
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
    this.apiService.endpoints[Entity.DATA_PRODUCT].get
      .call(
        {
          instanceId: id,
        },
        false,
      )
      .then((data: Array<DataProductDetailDataSource>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.dataProduct = data.shift();
          console.log(this.dataProduct);

          if (this.dataProduct) {
            this.actionService.setLiveEdit();
            this.trackFormData();
            // this.patch('spatialExtent');
            // this.patch('temporalExtent');

            this.actionService.trackCurrentEdit({
              type: Entity.DATA_PRODUCT,
              route: EntityEndpointValue.DATA_PRODUCT,
              label: 'Data Product',
              status: Status.Draft,
              color: 'draft',
              id: this.dataProduct.instanceId,
            });
          }
        }
      });
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      instanceId: this.dataProduct?.instanceId as string,
      uid: this.dataProduct?.uid,
      title: this.dataProduct?.title,
      description: this.dataProduct?.description,
      changeTimestamp: this.dataProduct?.changeTimestamp,
      state: this.dataProduct?.state,
      identifier: [this.dataProduct?.identifier],
      // issued: this.isValidDate(this.dataProduct?.issued) ? this.dataProduct?.issued : '',
      keywords: HelpersService.whiteSpaceReplace(this.dataProduct?.keywords),
      modified: this.dataProduct?.modified,
      versionInfo: this.dataProduct?.versionInfo,
      spatialExtent: this.formBuilder.array([]),
      temporalExtent: this.formBuilder.array([]),
      distribution: this.formBuilder.array([]),
      contactPoint: this.formBuilder.array([]),
    });
    this.form.valueChanges.subscribe((changes) => {
      const value = changes;
      // TODO: Some stange behaviour where the detect changes pops value out of array.
      value['title'] = [changes['title']];
      value['description'] = [changes['description']];
      this.actionService.resetToDraft(this.dataProduct?.instanceId as string);
      this.persistorService.setValueInStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA, JSON.stringify(value));
    });
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  public handleGetRevisions(): void {
    // Todo: pass revisions data to component
    this.dialogService.openDialogForComponent(
      RevisionsComponent,
      {
        metaId: this.dataProduct?.metaId,
      },
      '35vw',
      'auto',
      'revisions-dialog',
    );
  }

  public handleDelete(): void {
    // Todo: delete item from DB
    if (this.dataProduct?.instanceId) {
      this.dialogService.handleDelete(this.dataProduct?.instanceId, EntityEndpointValue.DATA_PRODUCT);
    }
  }
}
