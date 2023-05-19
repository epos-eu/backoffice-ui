import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { RevisionsComponent } from 'src/components/dialogs/revisions/revisions.component';
import { ActionsService } from 'src/services/actions.service';
import { HelpersService } from 'src/services/helpers.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

@Component({
  selector: 'app-webservice-form-details',
  templateUrl: './webservice-form-details.component.html',
  styleUrls: ['./webservice-form-details.component.scss'],
})
export class WebserviceFormDetailsComponent {
  @Input() set accessService(webserviceDetails: EntityDetail) {
    this.initData(webserviceDetails.instanceId);
  }

  public options: UntypedFormGroup;
  private hideRequiredControl = new UntypedFormControl(false);
  public floatLabelControl = new UntypedFormControl('auto');
  public webservice!: WebService | undefined;
  public editModeEnabled = false;
  public form!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private actionService: ActionsService,
    private persistorService: PersistorService,
  ) {
    this.options = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.webservice = this.router.getCurrentNavigation()?.extras.state as WebService;
  }

  private initData(id: string): void {
    this.apiService.endpoints[Entity.WEBSERVICE].get
      .call(
        {
          instanceId: id,
        },
        false,
      )
      .then((data: Array<WebserviceDetailDataSource>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.webservice = data.shift();
          if (this.webservice && this.webservice.instanceId) {
            this.trackFormData();
          }
        }
      });
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      instanceId: this.webservice?.instanceId as string,
      uid: this.webservice?.uid,
      metaId: this.webservice?.metaId,
      name: this.webservice?.name,
      description: this.webservice?.description,
      // datePublished: this.webservice?.datePublished,
      dateModified: this.webservice?.dateModified,
      changeComment: this.webservice?.changeComment,
      changeTimestamp: this.webservice?.changeTimestamp,
      // identifier: this.webservice?.identifier,
      entryPoint: this.webservice?.entryPoint,
      keywords: HelpersService.whiteSpaceReplace(this.webservice?.keywords),
      // supportedOperation: this.webservice?.supportedOperation,
      // temporalExtent: this.webservice?.temporalExtent,
      license: this.webservice?.license,
    });
  }

  public handleChange(event: MatSlideToggleChange): void {
    this.editModeEnabled = event.checked;
  }

  public handleSave() {
    // this.form.value['description'] = [this.form.value['description']];
    // this.form.value['title'] = [this.form.value['title']];
    this.apiService.endpoints.Webservice.update
      .call(this.form.value as WebService)
      .then((data: WebserviceDetailDataSource) => {
        const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
        if (localStorage !== null) {
          const entityDetail: EntityDetail = {
            entityType: 'webservice',
            metaId: data.metaId,
            uid: data.uid,
            instanceId: data.instanceId,
          };
          // this.snackbarService.openSnackbar(`Success: ${data.uid} created`, 'close', 'success', 6000, [
          //   'snackbar',
          //   'mat-toolbar',
          //   'snackbar-success',
          // ]);
          const formData: DataProduct = JSON.parse(localStorage);
          formData.distribution?.push(entityDetail);
          this.persistorService.setValueInStorage(
            StorageType.LOCAL_STORAGE,
            StorageKey.FORM_DATA,
            JSON.stringify(formData),
          );
        }
      });
  }

  public handleDelete(): void {
    if (this.webservice && this.webservice.instanceId) {
      this.dialogService.handleDelete(this.webservice.instanceId, EntityEndpointValue.WEBSERVICE);
    }
  }

  public formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' });
    }
    return 'Invalid date';
  };

  public handleGetRevisions(): void {
    // Todo: pass revisions data to component
    this.dialogService.openDialogForComponent(
      RevisionsComponent,
      {
        metaId: this.webservice?.metaId,
      },
      '35vw',
      'auto',
      'revisions-dialog',
    );
  }
}
