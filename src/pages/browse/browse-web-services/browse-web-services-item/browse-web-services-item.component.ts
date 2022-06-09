import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { SnackbarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-browse-web-services-item',
  templateUrl: './browse-web-services-item.component.html',
  styleUrls: ['./browse-web-services-item.component.scss'],
})
export class BrowseWebServicesItemComponent {
  public options: FormGroup;
  private hideRequiredControl = new FormControl(false);
  public floatLabelControl = new FormControl('auto');
  public webservice!: WebService;
  public editModeEnabled = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
  ) {
    this.options = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.webservice = this.router.getCurrentNavigation()?.extras.state as WebService;
  }

  public handleChange(event: MatSlideToggleChange): void {
    this.editModeEnabled = event.checked;
  }

  public handleSave() {
    // TODO: add Save method for DB operation
    this.snackbarService.openSnackbar('Item saved successfully', 'Close', true, 4000, [
      'snackbar',
      'mat-toolbar',
      'snackbar-primary',
    ]);
  }

  public handleDelete(): void {
    this.dialogService.handleDelete();
  }

  public handleCancel(): void {
    this.dialogService.handleCancel();
  }

  public handleConfirm(): void {
    this.dialogService.handleConfirm();
  }

  public formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' });
    }
    return 'Invalid date';
  };
}
