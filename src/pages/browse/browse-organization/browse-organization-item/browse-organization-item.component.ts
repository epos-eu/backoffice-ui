import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/components/dialog/dialog.component';
import { SnackbarComponent } from 'src/components/snackbar/snackbar.component';
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

  @ViewChild('addContactPoint', { read: TemplateRef }) addContactPoint!: TemplateRef<Element>;

  constructor(fb: FormBuilder, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar) {
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

  public handleSave() {
    // TODO: add Save method for DB operation
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 7000,
      data: {
        title: 'Item saved successfully',
        action: 'Close',
        success: true,
      },
      panelClass: ['snackbar', 'mat-toolbar', 'snackbar-primary'],
    });
  }

  public handleDelete(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '250px',
      width: '400px',
      data: {
        title: "You're about to delete an item",
        content: 'Are you sure you want to continue?',
        actionConfirm: 'Delete',
        actionCancel: 'Cancel',
      },
      panelClass: 'custom-dialog',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        // TODO: add Delete method for DB operation
      }
    });
  }

  public handleAdd(): void {
    this.dialog.open(DialogComponent, {
      height: '250px',
      width: '400px',
      data: {
        content: this.addContactPoint,
      },
    });
  }
}
