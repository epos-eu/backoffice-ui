import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { ActionsService } from 'src/services/actions.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { State } from 'src/utility/enums/state.enum';

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
    private actionsService: ActionsService,
  ) {}

  ngOnInit(): void {
    this.trackFormData();
  }

  public handleCreate(): void {
    this.loading = true;
    const item: ContactPoint = {
      uid: this.form.value['uid'],
    };

    this.apiService.endpoints.ContactPoint.create
      .call(item)
      .then((value: ContactPointDetailDataSource) => {
        this.router.navigate([`/browse/${EntityEndpointValue.CONTACT_POINT}/details`, value.instanceId]);
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'close', 'success', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
        this.actionsService.addEditedItems([
          {
            type: Entity.CONTACT_POINT,
            route: EntityEndpointValue.CONTACT_POINT,
            label: 'Contact Point',
            state: State.DRAFT,
            color: 'draft',
            id: value.instanceId,
          },
        ]);
        this.actionsService.saveCurrentEdit(value.instanceId);
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
