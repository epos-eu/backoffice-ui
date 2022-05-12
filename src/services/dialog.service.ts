import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogComponent } from 'src/components/dialog/dialog.component';
import { IDialog } from 'src/components/dialog/dialog.interface';

interface ISize {
  width: string;
  height: string;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  private dialogRef!: MatDialogRef<DialogComponent>;
  private dialogState = new BehaviorSubject<string>('');
  public dialogStateObservable = this.dialogState.asObservable();

  public openDialog(type: IDialog['type'], panelClass?: string, size?: ISize, content?: any): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      height: size?.height ? size?.height : '250px',
      width: size?.width ? size?.width : '450px',
      data: {
        type,
        content,
      },
      panelClass,
    });
    this.dialogRef.afterClosed().subscribe((result) => this.dialogState.next(result));
  }

  public handleCancel(): void {
    this.handleClose('cancel');
  }

  public handleConfirm(): void {
    this.handleClose('confirm');
  }

  public handleClose(button: 'cancel' | 'confirm'): void {
    this.dialogRef.close(button);
  }
}
