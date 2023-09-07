import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../baseDialogService.abstract';

export interface ConfirmationDataIn {
  messageHtml: string;
  confirmButtonHtml: string;
  confirmButtonCssClass: string;
  cancelButtonHtml: string;
}

/**
 * General purpose confirmation dialog
 */
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirmDialog.component.html',
  styleUrls: ['./confirmDialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<ConfirmationDataIn, boolean>) {}

  public confirm(): void {
    this.close(true);
  }
  public cancel(): void {
    this.close(false);
  }

  private close(confirmed: boolean): void {
    this.data.dataOut = confirmed;
    this.data.close();
  }
}
