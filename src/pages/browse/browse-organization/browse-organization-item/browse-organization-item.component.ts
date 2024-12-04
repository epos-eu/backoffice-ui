import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';
import { Organization } from 'src/apiAndObjects/objects/entities/organization.model';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-browse-organization-item',
  templateUrl: './browse-organization-item.component.html',
  styleUrls: ['./browse-organization-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BrowseOrganizationItemComponent {
  public options: UntypedFormGroup;
  public hideRequiredControl = new UntypedFormControl(false);
  public floatLabelControl = new UntypedFormControl('auto');
  public editModeEnabled = false;
  public organization!: Organization;

  constructor(
    fb: UntypedFormBuilder,
    private router: Router,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private location: Location,
  ) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.organization = this.location.getState() as Organization;
  }

  public handleChange(event: MatSlideToggleChange): void {
    this.editModeEnabled = event.checked;
  }

  public handleSave(): void {
    // TODO: add Save method for DB operation
    this.snackbarService.openSnackbar('Item saved successfully', 'Close', SnackbarType.SUCCESS, 4000, [
      'snackbar',
      'mat-toolbar',
      'snackbar-primary',
    ]);
  }

  public handleDelete(): void {
    // this.dialogService.handleDelete();
  }

  public handleAddPerson(): void {
    // this.dialogService.handleAddPerson();
  }

  public handleAddContact(): void {
    // this.dialogService.handleAddContact();
  }
}
