import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialog } from './dialog.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialog, public dialogRef: MatDialogRef<DialogComponent>) {}

  public handleCancel() {
    this.handleClose('cancel');
  }

  public handleConfirm() {
    this.handleClose('confirm');
  }

  public handleClose(button: 'cancel' | 'confirm') {
    this.dialogRef.close(button);
  }
}
