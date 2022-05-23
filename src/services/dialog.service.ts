import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogComponent } from 'src/components/dialogs/dialog/dialog.component';
import { DialogTypes, IDialog } from 'src/components/dialogs/dialog/dialog.model';
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

  public openDialog(
    component: ComponentType<DialogTypes>,
    size?: ISize | Record<string, never>,
    panelClass?: string,
    content?: IDialog['content'],
  ): void {
    this.dialog.open(DialogComponent, {
      height: size?.height ? size?.height : '250px',
      width: size?.width ? size?.width : '450px',
      data: {
        content,
        component,
      },
      panelClass,
    });
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
