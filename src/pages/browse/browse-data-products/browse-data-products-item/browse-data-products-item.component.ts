import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { ContactPointDataSource } from 'src/apiAndObjects/objects/contactPointDataSource';
import { DataProductsDataSource } from 'src/apiAndObjects/objects/dataProductsDataSource';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/distributionDetailDataSource';
import { SpatialExtent } from 'src/apiAndObjects/objects/types/spatialExtent.type';
import { TemporalExtent } from 'src/apiAndObjects/objects/types/temporalExtent.type';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { RevisionsComponent } from 'src/components/dialogs/revisions/revisions.component';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { ActionsService } from 'src/services/actions.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Entity } from 'src/utility/enums/entity.enum';
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
  public distribution!: Array<DistributionDetailDataSource>;
  public distributionLoaded = false;
  public contactPoint!: Array<ContactPointDataSource>;
  public contactPointLoaded = false;

  constructor(
    private dialogService: DialogService,
    private actionService: ActionsService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private persistorService: PersistorService,
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
    this.apiService.endpoints[Entity.DATA_PRODUCT].getDataProductDetail
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
            this.trackFormData();
            this.patch('spatialExtent');
            this.patch('temporalExtent');
            this.actionService.trackCurrentEdit(this.dataProduct.instanceId);
          }
        }
      });
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      uid: this.dataProduct?.uid,
      title: [this.dataProduct?.title],
      description: [this.dataProduct?.description],
      changeTimestamp: this.dataProduct?.changeTimestamp,
      state: this.dataProduct?.state,
      identifier: [this.dataProduct?.identifier],
      issued: this.dataProduct?.issued,
      keywords: this.dataProduct?.keywords,
      modified: this.dataProduct?.modified,
      versionInfo: this.dataProduct?.versionInfo,
      spatialExtent: this.formBuilder.array([]),
      temporalExtent: this.formBuilder.array([]),
      distribution: this.formBuilder.array([]),
      contactPoint: this.formBuilder.array([]),
    });
    this.form.valueChanges.subscribe((changes) => {
      this.actionService.resetToDraft(this.dataProduct?.instanceId as string);
      this.persistorService.setValueInStorage(
        StorageType.LOCAL_STORAGE,
        StorageKey.FORM_DATA_PRODUCT,
        JSON.stringify(changes),
      );
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
            control.push(this.patchValues('spatialExtent', [item.location]));
          });
          break;
        case field === 'temporalExtent':
          this.dataProduct.temporalExtent.forEach((item: TemporalExtent) => {
            control.push(this.patchValues('temporalExtent', [item.startDate, item.endDate]));
          });
          break;
        // case field === 'distribution':
        //   this.distribution.forEach((item) => {
        //     control.push(this.patchValues('distribution', [item.uid, item.title]));
        //   });
        //   break;
        // case field === 'contactPoint':
        //   this.contactPoint.forEach((item) => {
        //     control.push(this.patchValues('contactPoint', [item.uid, item.email]));
        //   });
        //   break;
      }
    }
  }

  private patchValues(field: string, values: Array<string | moment.Moment | string[] | undefined>) {
    switch (true) {
      case field === 'spatialExtent':
        return this.formBuilder.group({
          location: [values[0]],
        });
      case field === 'temporalExtent':
        return this.formBuilder.group({
          startDate: values[0],
          endDate: values[1],
        });
      case field === 'distribution':
        return this.formBuilder.group({
          uid: values[0],
          title: values[1],
          fileProvenance: values[2],
          description: values[3],
          format: values[4],
          type: values[5],
          issued: values[6],
          modified: values[7],
          changeTimestamp: values[8],
        });
      case field === 'contactPoint':
        return this.formBuilder.group({
          uid: values[0],
          email: values[1],
          organization: values[2],
          telephone: values[2],
          changeTimestamp: values[2],
        });
      default:
        return this.formBuilder.group({});
    }
  }

  private patchDistribution(distribution: Array<DistributionDetailDataSource>) {
    const control = <FormArray>this.form.get('distribution');
    distribution.forEach((item) => {
      control.push(
        this.patchValues('distribution', [
          item.uid,
          item.title,
          item.fileProvenance,
          item.description,
          item.format,
          item.type,
          item.issued,
          item.modified,
          item.changeTimestamp,
        ]),
      );
    });
  }
  private patchContactPoint(contactPoint: Array<ContactPointDataSource>) {
    const control = <FormArray>this.form.get('contactPoint');
    contactPoint.forEach((item) => {
      control.push(
        this.patchValues('contactPoint', [
          item.uid,
          item.email,
          item.organization,
          item.telephone,
          item.changeTimestamp,
        ]),
      );
    });
  }

  public handleGetRevisions(): void {
    // Todo: pass revisions data to component
    this.dialogService.openDialogForComponent(RevisionsComponent, {}, '35vw', 'auto', 'revisions-dialog');
  }

  public handleDelete(): void {
    // Todo: delete item from DB
    this.dialogService.handleDelete();
  }

  public handleBack(): void {
    this.router.navigate(['/browse/data-products']);
  }

  private mapDistributionCalls(ids: Array<string>): Promise<DistributionDetailDataSource[]>[] {
    return ids.map((id) => {
      return this.apiService.endpoints[Entity.DISTRIBUTION].getDistributionDetail.call({
        instanceId: id,
      });
    });
  }

  private mapContactPointCalls(ids: Array<string>): Promise<ContactPointDataSource[]>[] {
    return ids.map((id) => {
      return this.apiService.endpoints[Entity.CONTACT_POINT].getContactPointDetail.call({
        instanceId: id,
      });
    });
  }

  public handleExpand(type: string): void {
    switch (true) {
      case type === 'distribution':
        if (!this.distributionLoaded) {
          if (this.dataProduct?.distribution) {
            const ids = this.dataProduct?.distribution.map((item) => item.instanceId);
            if (ids && ids.length > 0) {
              forkJoin(this.mapDistributionCalls(ids)).subscribe((distributions) => {
                distributions.forEach((distribution: DistributionDetailDataSource[]) => {
                  this.patchDistribution(distribution);
                  this.distributionLoaded = true;
                });
              });
            }
          }
        }
        break;
      case type === 'contactPoint':
        if (!this.contactPointLoaded) {
          if (this.dataProduct?.contactPoint) {
            const ids = this.dataProduct?.contactPoint.map((item) => item.instanceId);
            if (ids && ids.length > 0) {
              forkJoin(this.mapContactPointCalls(ids)).subscribe((contactPoints) => {
                contactPoints.forEach((contactPoint: Array<ContactPointDataSource>) => {
                  this.patchContactPoint(contactPoint);
                  this.contactPointLoaded = true;
                });
              });
            }
          }
        }
        break;
    }
  }
}
