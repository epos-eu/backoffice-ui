import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/webserviceDetailDataSource';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { ActionsService } from 'src/services/actions.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-browse-web-services-item',
  templateUrl: './browse-web-services-item.component.html',
  styleUrls: ['./browse-web-services-item.component.scss'],
})
export class BrowseWebServicesItemComponent implements OnInit {
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
  ) {
    this.options = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.webservice = this.router.getCurrentNavigation()?.extras.state as WebService;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((obs) => {
      if (null != obs.get('id')) {
        this.initData(obs.get('id') as string);
      }
    });
  }

  private initData(id: string): void {
    this.apiService.endpoints[Entity.WEBSERVICE].getWebserviceDetail
      .call(
        {
          instanceId: id,
        },
        false,
      )
      .then((data: Array<WebserviceDetailDataSource>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.webservice = data.shift();
          if (this.webservice) {
            this.actionService.setLiveEdit();
            this.trackFormData();
            this.actionService.trackCurrentEdit(this.webservice.instanceId);
          }
        }
      });
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      instanceId: this.webservice?.instanceId as string,
      identifier: this.webservice?.identifier,
    });
  }

  public handleChange(event: MatSlideToggleChange): void {
    this.editModeEnabled = event.checked;
  }

  public handleSave() {
    // TODO: add Save method for DB operation
    this.snackbarService.openSnackbar('Item saved successfully', 'Close', 'success', 4000, [
      'snackbar',
      'mat-toolbar',
      'snackbar-primary',
    ]);
  }

  public handleDelete(): void {
    // this.dialogService.handleDelete();
  }

  public handleCancel(): void {
    // this.dialogService.handleCancel();
  }

  public handleConfirm(): void {
    // this.dialogService.handleConfirm();
  }

  public formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' });
    }
    return 'Invalid date';
  };
}
