import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { RevisionsComponent } from 'src/components/dialogs/revisions/revisions.component';
import { ActionsService } from 'src/services/actions.service';
import { OperationsService } from 'src/services/operations.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

@Component({
  selector: 'app-contact-point-form-details',
  templateUrl: './contact-point-form-details.component.html',
  styleUrls: ['./contact-point-form-details.component.scss'],
})
export class ContactPointFormDetailsComponent implements OnInit {
  @Input() contactPointDetails: EntityDetail | undefined;

  public floatLabelControl = new UntypedFormControl('auto');
  public contactPoint!: ContactPointDetailDataSource | undefined;
  public UID!: string | null;
  // public currentEdit!: IChangeItem;
  public form!: UntypedFormGroup;
  public entityRoute = EntityEndpointValue.CONTACT_POINT;

  constructor(
    private dialogService: DialogService,
    private formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    private persistorService: PersistorService,
  ) {}

  ngOnInit(): void {
    if (this.contactPointDetails) {
      this.initData(this.contactPointDetails?.instanceId);
    }
    // this.persistorService.setValueInStorage(StorageType.LOCAL_STORAGE, StorageKey.ACTIVE_ENTITY, Entity.CONTACT_POINT);
    // this.route.paramMap.subscribe((obs) => {
    //   if (null != obs.get('id')) {
    //     this.initData(obs.get('id') as string);
    //   }
    // });
  }

  private initData(id: string): void {
    this.apiService.endpoints[Entity.CONTACT_POINT].get
      .call(
        {
          instanceId: id,
        },
        false,
      )
      .then((data: Array<ContactPointDetailDataSource>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.contactPoint = data.shift();
          this.trackFormData();

          // if (this.contactPoint) {
          //   this.actionService.setLiveEdit();
          //   // this.patch('spatialExtent');
          //   // this.patch('temporalExtent');
          //   this.actionService.trackCurrentEdit({
          //     type: Entity.CONTACT_POINT,
          //     route: EntityEndpointValue.CONTACT_POINT,
          //     label: 'Contact Point',
          //     state: this.contactPoint.state,
          //     color: 'draft',
          //     id: this.contactPoint.instanceId,
          //   });
          // }
        }
      });
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      changeTimestamp: new Date(),
      editorId: this.contactPoint?.editorId,
      // email: [],
      instanceId: this.contactPoint?.instanceId as string,
      uid: this.contactPoint?.uid,
      operation: this.contactPoint?.operation,
      metaId: this.contactPoint?.metaId,
      fileProvenance: this.contactPoint?.fileProvenance,
      // groups: this.contactPoint?.groups,
      // organization: this.contactPoint?.organization,
      // person: this.contactPoint?.person,
      role: this.contactPoint?.role,
      state: this.contactPoint?.state,
      // telephone: this.contactPoint?.telephone,
      toBeDelete: this.contactPoint?.toBeDelete,
      version: this.contactPoint?.version,
      changeComment: '',
    });
  }

  public handleGetRevisions(): void {
    // Todo: pass revisions data to component
    this.dialogService.openDialogForComponent(
      RevisionsComponent,
      {
        metaId: this.contactPoint?.metaId,
      },
      '35vw',
      'auto',
      'revisions-dialog',
    );
  }

  public handleSave(): void {
    // this.persistorService.setValueInStorage(
    //   StorageType.LOCAL_STORAGE,
    //   StorageKey.ACTIVE_CONTACT_FORM_DATA,
    //   JSON.stringify(this.form.value),
    // );

    console.debug(this.form.value as ContactPoint);
    this.apiService.endpoints.Contactpoint.update
      .call(this.form.value as ContactPoint)
      .then((data: ContactPointDetailDataSource) => {
        const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
        if (localStorage !== null) {
          const entityDetail: EntityDetail = {
            entityType: 'contactpoint',
            metaId: data.metaId,
            uid: data.uid,
            instanceId: data.instanceId,
          };
          const formData: DataProduct = JSON.parse(localStorage);
          formData.contactPoint?.push(entityDetail);
          this.persistorService.setValueInStorage(
            StorageType.LOCAL_STORAGE,
            StorageKey.FORM_DATA,
            JSON.stringify(formData),
          );
        }
      });
    // this.operationsService.handleContactPointSave();
  }
}
