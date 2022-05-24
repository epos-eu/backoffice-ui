import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from 'src/components/dialogs/dialog-delete/dialog-delete.component';
import { DialogAddPersonComponent } from 'src/components/dialogs/dialog-add-person/dialog-add-person.component';
import { initEmptyPersonObj } from 'src/helpers/person';
import { DialogService } from 'src/services/dialog.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Organization } from '../../../../api/models/entities/organization.model';
import { DialogAddContactComponent } from 'src/components/dialogs/dialog-add-contact/dialog-add-contact.component';
import { initEmptyContactObj } from 'src/helpers/contact';

@Component({
  selector: 'app-browse-organization-item',
  templateUrl: './browse-organization-item.component.html',
  styleUrls: ['./browse-organization-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BrowseOrganizationItemComponent {
  public options: FormGroup;
  public hideRequiredControl = new FormControl(false);
  public floatLabelControl = new FormControl('auto');
  public editModeEnabled = false;
  public organization!: Organization;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
  ) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.organization = this.router.getCurrentNavigation()?.extras.state as Organization;
  }

  public handleChange(event: MatSlideToggleChange): void {
    this.editModeEnabled = event.checked;
  }

  public handleSave(): void {
    // TODO: add Save method for DB operation
    this.snackbarService.openSnackbar('Item saved successfully', 'Close', true, 4000, [
      'snackbar',
      'mat-toolbar',
      'snackbar-primary',
    ]);
  }

  public handleDelete(): void {
    this.dialogService.openDialog(DialogDeleteComponent, {}, 'custom-dialog');
    this.dialogService.dialogStateObservable.subscribe((result) => {
      // TODO: add delete method for DB operation
    });
  }

  public handleAddPerson(): void {
    console.log(initEmptyPersonObj());
    this.dialogService.openDialog(
      DialogAddPersonComponent,
      {
        width: '700px',
        height: '700px',
      },
      '',
      initEmptyPersonObj(),
    );
    this.dialogService.dialogStateObservable.subscribe((result) => {
      // TODO: save form data into DB
      if (result) {
        console.log(result);
        // this.snackbarService.openSnackbar('Item saved successfully', 'Close', true, 4000, [
        //   'snackbar',
        //   'mat-toolbar',
        //   'snackbar-primary',
        // ]);
      }
    });
  }

  public handleAddContact(): void {
    this.dialogService.openDialog(
      DialogAddContactComponent,
      {
        width: '700px',
        height: '650px',
      },
      '',
      initEmptyContactObj(),
    );
    this.dialogService.dialogStateObservable.subscribe((result) => {
      // TODO: save form data into DB
      if (result) {
        console.log(result);
        // do stuff
      }
    });
  }
}
