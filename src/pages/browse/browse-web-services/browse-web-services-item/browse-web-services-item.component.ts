import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WebService } from 'src/api/models/entities/webService.model';
import { DialogComponent } from 'src/components/dialog/dialog.component';
import { SnackbarComponent } from 'src/components/snackbar/snackbar.component';

@Component({
  selector: 'app-browse-web-services-item',
  templateUrl: './browse-web-services-item.component.html',
  styleUrls: ['./browse-web-services-item.component.scss'],
})
export class BrowseWebServicesItemComponent implements OnInit {
  public options: FormGroup;
  private hideRequiredControl = new FormControl(false);
  public floatLabelControl = new FormControl('auto');
  public webservice!: WebService;
  public editModeEnabled = false;

  @ViewChild('actionDialog', { read: TemplateRef }) actionDialog!: TemplateRef<Element>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.options = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.webservice = this.router.getCurrentNavigation()?.extras.state as WebService;
  }

  ngOnInit(): void {
    console.log(this.webservice);
  }

  public handleChange(event: MatSlideToggleChange): void {
    this.editModeEnabled = event.checked;
  }

  public handleSave() {
    // TODO: add Save method for DB operation
    // If successful
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
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
        content: this.actionDialog,
      },
      panelClass: 'custom-dialog',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        // TODO: add Delete method for DB operation
      }
    });
  }

  public formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' });
    }
    return 'Invalid date';
  };
}
