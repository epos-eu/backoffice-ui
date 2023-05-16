import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { SnackbarService } from 'src/services/snackbar.service';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-create-contact-point-item',
  templateUrl: './create-contact-point-item.component.html',
  styleUrls: ['./create-contact-point-item.component.scss'],
})
export class CreateContactPointItemComponent implements OnInit {
  public form!: UntypedFormGroup;
  public contactPoint!: ContactPointDetailDataSource | undefined;
  public floatLabelControl = new UntypedFormControl('auto');
  public loading = false;

  public enableSave = false;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.trackFormData();
  }

  public handleCreate(): void {
    this.loading = true;
    const item: ContactPoint = {
      uid: this.form.value['uid'],
    };

    this.apiService.endpoints.Contactpoint.create
      .call(item)
      .then((value: ContactPointDetailDataSource) => {
        this.router.navigate([`/browse/${EntityEndpointValue.CONTACT_POINT}/details`, value.instanceId]);
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'close', 'success', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: failed to create new Contact Point`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      )
      .finally(() => (this.loading = false));
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      uid: this.contactPoint?.uid,
    });
    this.form.valueChanges.subscribe(() => {
      this.enableSave = this.form.valid;
    });
  }
}
