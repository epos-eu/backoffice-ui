import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogAddContactComponent } from 'src/components/dialogs/dialog-add-contact/dialog-add-contact.component';
import { DialogAddPersonComponent } from 'src/components/dialogs/dialog-add-person/dialog-add-person.component';
import { DialogDeleteComponent } from 'src/components/dialogs/dialog-delete/dialog-delete.component';
import { DialogComponent } from 'src/components/dialogs/dialog/dialog.component';
import { DialogTypes, IDialog } from 'src/components/dialogs/dialog/dialog.model';
import { MetadataFileViewComponent } from 'src/components/dialogs/metadata-file-view/metadata-file-view.component';
import { initEmptyContactObj } from 'src/helpers/contact';
import { initEmptyPersonObj } from 'src/helpers/person';
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

  private openDialog(
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

  public openMetadateViewDialog(): void {
    this.openDialog(MetadataFileViewComponent, {
      width: '100%',
      height: '100%',
    });
  }

  public handleDelete(): void {
    this.openDialog(
      DialogDeleteComponent,
      {
        width: '450px',
        height: '275px',
      },
      'custom-dialog',
    );
    this.dialogStateObservable.subscribe((result) => {
      if (Boolean(result) && result === 'delete') {
        // TODO: add delete method to remove from DB
      }
    });
  }

  public handleAddContact(): void {
    this.openDialog(
      DialogAddContactComponent,
      {
        width: '700px',
        height: '650px',
      },
      '',
      initEmptyContactObj(),
    );
    this.dialogStateObservable.subscribe((result) => {
      // TODO: save form data into DB
      if (result) {
        // do stuff
      }
    });
  }

  public handleAddPerson(): void {
    this.openDialog(
      DialogAddPersonComponent,
      {
        width: '700px',
        height: '700px',
      },
      '',
      initEmptyPersonObj(),
    );
    this.dialogStateObservable.subscribe((result) => {
      // TODO: save form data into DB
      if (result) {
        // do stuff
      }
    });
  }
}
