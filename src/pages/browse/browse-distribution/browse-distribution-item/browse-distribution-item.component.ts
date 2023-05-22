import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
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
            this.actionService.trackCurrentEdit({
              type: Entity.DISTRIBUTION,
              route: EntityEndpointValue.DISTRIBUTION,
              label: 'Distribution',
              state: this.distributionDetail.state,
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
      this.persistorService.setValueInStorage(
        StorageType.LOCAL_STORAGE,
        StorageKey.ACTIVE_DISTRIBUTION_FORM_DATA,
        JSON.stringify(value),
      );
    });
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
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
