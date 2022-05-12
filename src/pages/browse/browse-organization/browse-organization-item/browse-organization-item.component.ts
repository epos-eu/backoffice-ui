import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { Person } from 'src/api/models/entities/person.model';
import { DialogService } from 'src/services/dialog.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Organization } from '../../../../api/models/entities/organization.model';

@Component({
  selector: 'app-browse-organization-item',
  templateUrl: './browse-organization-item.component.html',
  styleUrls: ['./browse-organization-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BrowseOrganizationItemComponent implements OnInit {
  public options: FormGroup;
  public hideRequiredControl = new FormControl(false);
  public floatLabelControl = new FormControl('auto');
  public editModeEnabled = false;
  public organization!: Organization;
  public formData: Person = new Person(
    {
      country: 'France',
      locality: '---',
      postalCode: '90150',
      street: '---',
    },
    ['NA'],
    'NA',
    ['test@example.com'],
    'Smith',
    'NA',
    'John',
    [
      {
        identifier: 'NA',
        type: 'NA',
      },
    ],
    ['Seismologist'],
    ['00000 000 000'],
    '001',
  );

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

  ngOnInit(): void {
    console.log(this.organization);
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
    this.dialogService.openDialog('delete', 'custom-dialog');
    this.dialogService.dialogStateObservable.subscribe((result) => {
      console.log(result);
    });
  }

  public handleAdd(): void {
    this.dialogService.openDialog(
      'form-add',
      'custom-dialog',
      {
        width: '700px',
        height: '800px',
      },
      this.formData,
    );
    this.dialogService.dialogStateObservable.subscribe((result) => {
      // TODO: save form data into DB
      if (result) {
        const person = result as unknown as Person;
        this.snackbarService.openSnackbar(
          `Added new person '${person.givenName} ${person.familyName}'`,
          'Close',
          true,
          4000,
          ['snackbar', 'mat-toolbar', 'snackbar-primary'],
        );
      }
    });
  }
}
