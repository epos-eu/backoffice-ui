import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { Status } from 'src/apiAndObjects/objects/enums/actions.enum';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { RevisionsComponent } from 'src/components/dialogs/revisions/revisions.component';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { ActionsService } from 'src/services/actions.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

@Component({
  selector: 'app-browse-distribution-item',
  templateUrl: './browse-distribution-item.component.html',
  styleUrls: ['./browse-distribution-item.component.scss'],
})
export class BrowseDistributionItemComponent implements OnInit, OnDestroy {
  public floatLabelControl = new UntypedFormControl('auto');
  public distributionDetail!: DistributionDetailDataSource | undefined;
  public UID!: string | null;
  public currentEdit!: IChangeItem;
  public form!: UntypedFormGroup;
  public distributionLoaded = false;
  public contactPoint!: Array<ContactPointDetailDataSource>;
  public contactPointLoaded = false;
  public entityRoute = EntityEndpointValue.DISTRIBUTION;

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

  public ngOnInit(): void {
    this.persistorService.setValueInStorage(StorageType.LOCAL_STORAGE, StorageKey.ACTIVE_ENTITY, Entity.DISTRIBUTION);
    this.route.paramMap.subscribe((obs) => {
      if (null != obs.get('id')) {
        this.initData(obs.get('id') as string);
      }
    });
  }

  public ngOnDestroy(): void {
    this.actionService.cancelLiveEdit();
  }

  private initData(id: string): void {
    this.apiService.endpoints.Distribution.get
      .call(
        {
          instanceId: id,
        },
        false,
      )
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.distributionDetail = data.shift();
          if (this.distributionDetail) {
            this.actionService.setLiveEdit();
            this.trackFormData();
            // this.patch('spatialExtent');
            // this.patch('temporalExtent');
            this.actionService.trackCurrentEdit({
              type: Entity.DISTRIBUTION,
              route: EntityEndpointValue.DISTRIBUTION,
              label: 'Distribution',
              status: Status.Draft,
              color: 'draft',
              id: this.distributionDetail.instanceId,
            });
          }
        }
      });
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      instanceId: this.distributionDetail?.instanceId as string,
      uid: this.distributionDetail?.uid,
      title: [this.distributionDetail?.title],
      description: [this.distributionDetail?.description],
      changeTimestamp: this.distributionDetail?.changeTimestamp,
      state: this.distributionDetail?.state,
      modified: this.distributionDetail?.modified,
    });
    this.form.valueChanges.subscribe((changes) => {
      const value = changes;
      // value['description'] = [changes['description']];
      // value['title'] = [changes['title']];
      this.actionService.resetToDraft(this.distributionDetail?.instanceId as string);
      this.persistorService.setValueInStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA, JSON.stringify(value));
    });
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  // private patch(field: string): void {
  //   const control = <FormArray>this.form.get(field);
  //   if (this.distributionDetail) {
  //     switch (true) {
  //       case field === 'spatialExtent':
  //         this.distributionDetail.spatialExtent.forEach((item: SpatialExtent) => {
  //           control.push(this.patchValues('spatialExtent', [item.location]));
  //         });
  //         break;
  //       case field === 'temporalExtent':
  //         this.distributionDetail.temporalExtent.forEach((item: TemporalExtent) => {
  //           control.push(this.patchValues('temporalExtent', [item.startDate, item.endDate]));
  //         });
  //         break;
  //     }
  //   }
  // }

  private patchValues(field: string, values: Array<string | Date | string[] | undefined | null>) {
    switch (true) {
      case field === 'spatialExtent':
        return this.formBuilder.group({
          location: [values[0]],
        });
      case field === 'temporalExtent':
        return this.formBuilder.group({
          startDate: values[0] ? values[0] : '',
          endDate: values[1] ? values[1] : '',
        });
      case field === 'distribution':
        return this.formBuilder.group({
          uid: values[0],
          title: values[1],
          fileProvenance: values[2],
          description: values[3],
          format: values[4],
          type: values[5],
          issued: values[6] as string,
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
  private patchContactPoint(contactPoint: Array<ContactPointDetailDataSource>) {
    const control = <FormArray>this.form.get('contactPoint');
    contactPoint.forEach((item) => {
      control.push(
        this.patchValues('contactPoint', [
          item.uid,
          item.email,
          // item.organization,
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
    if (this.distributionDetail?.instanceId) {
      this.dialogService.handleDelete(this.distributionDetail?.instanceId, EntityEndpointValue.DISTRIBUTION);
    }
  }
}
