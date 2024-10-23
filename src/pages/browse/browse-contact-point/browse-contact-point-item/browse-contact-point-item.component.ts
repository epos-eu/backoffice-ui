import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { DialogRevisionsComponent } from 'src/components/dialogs/dialog-revisions/dialog-revisions.component';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { ActionsService } from 'src/services/actions.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { ContactPoint } from 'generated/backofficeSchemas';

@Component({
  selector: 'app-browse-contact-point-item',
  templateUrl: './browse-contact-point-item.component.html',
  styleUrls: ['./browse-contact-point-item.component.scss'],
})
export class BrowseContactPointItemComponent implements OnInit, OnDestroy {
  public floatLabelControl = new UntypedFormControl('auto');
  public contactPoint!: ContactPoint | undefined;
  public UID!: string | null;
  public currentEdit!: IChangeItem;
  public form!: UntypedFormGroup;
  public entityRoute = EntityEndpointValue.CONTACT_POINT;

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
    // this.persistorService.setValueInStorage(StorageType.LOCAL_STORAGE, StorageKey.ACTIVE_ENTITY, Entity.CONTACT_POINT);
    this.route.paramMap.subscribe((obs) => {
      if (null != obs.get('id') && null != obs.get('metaId')) {
        this.initData(obs.get('id') as string, obs.get('metaId') as string);
      }
    });
  }

  ngOnDestroy(): void {
    this.actionService.cancelLiveEdit();
  }

  private initData(id: string, metaId: string): void {
    this.apiService.endpoints[Entity.CONTACT_POINT].get
      .call({
        metaId: metaId,
        instanceId: id,
      })
      .then((data: Array<ContactPoint>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.contactPoint = data.shift();

          if (this.contactPoint) {
            this.actionService.setLiveEdit();
            this.trackFormData();
          }
        }
      });
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      instanceId: this.contactPoint?.instanceId as string,
      uid: this.contactPoint?.uid,
      operation: this.contactPoint?.operation,
      // spatialExtent: this.formBuilder.array([]),
      // temporalExtent: this.formBuilder.array([]),
      // distribution: this.formBuilder.array([]),
      // contactPoint: this.formBuilder.array([]),
    });
    this.form.valueChanges.subscribe((changes) => {
      const value = changes;
      // TODO: Some stange behaviour where the detect changes pops value out of array.
      // value['title'] = [changes['title']];
      // value['description'] = [changes['description']];
      this.actionService.resetToDraft(this.contactPoint?.instanceId as string);
      this.persistorService.setValueInStorage(
        StorageType.LOCAL_STORAGE,
        StorageKey.ACTIVE_CONTACT_FORM_DATA,
        JSON.stringify(value),
      );
    });
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  public handleGetRevisions(): void {
    // Todo: pass revisions data to component
    this.dialogService.openDialogForComponent(DialogRevisionsComponent, {}, 'revisions-dialog');
  }

  public handleDelete(): void {
    // Todo: delete item from DB
    if (this.contactPoint?.instanceId) {
      this.dialogService.handleDelete(this.contactPoint?.instanceId, EntityEndpointValue.CONTACT_POINT);
    }
  }
}
