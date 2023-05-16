import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { SnackbarService } from 'src/services/snackbar.service';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-create-web-service-item',
  templateUrl: './create-web-service-item.component.html',
  styleUrls: ['./create-web-service-item.component.scss'],
})
export class CreateWebServiceItemComponent implements OnInit {
  public form!: UntypedFormGroup;
  public webservice: WebserviceDetailDataSource | undefined;
  public enableSave = false;
  public loading = false;
  public floatLabelControl = new UntypedFormControl('auto');
  public entityRoute = EntityEndpointValue.WEBSERVICE;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
  ) {}

  public ngOnInit(): void {
    this.trackFormData();
  }

  public handleCreate(): void {
    this.loading = true;
    const item: WebService = {
      uid: this.form.value['uid'],
      dateModified: new Date(),
    };

    this.apiService.endpoints.Webservice.create
      .call(item)
      .then((value: WebserviceDetailDataSource) => {
        this.router.navigate([`/browse/${EntityEndpointValue.WEBSERVICE}/details`, value.instanceId]);
        this.snackbarService.openSnackbar('Successfully created webservice.', 'close', 'success', 3000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
      })
      .catch(() => {
        this.snackbarService.openSnackbar('Failed to create new webservice.', 'close', 'error', 3000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]);
      })
      .finally(() => (this.loading = false));
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      uid: this.webservice?.uid,
    });
    this.form.valueChanges.subscribe(() => {
      this.enableSave = this.form.valid;
    });
  }
}
