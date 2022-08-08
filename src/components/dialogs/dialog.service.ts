import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogAddContactComponent } from 'src/components/dialogs/dialog-add-contact/dialog-add-contact.component';
import { DialogAddPersonComponent } from 'src/components/dialogs/dialog-add-person/dialog-add-person.component';
import { DialogDeleteComponent } from 'src/components/dialogs/dialog-delete/dialog-delete.component';
import { DialogComponent } from 'src/components/dialogs/dialog/dialog.component';
import { MetadataFileViewComponent } from 'src/components/dialogs/metadata-file-view/metadata-file-view.component';
import { BaseDialogService, DialogData } from './baseDialogService.abstract';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService extends BaseDialogService {
  private dialogRef!: MatDialogRef<DialogComponent>;
  private dialogState = new BehaviorSubject<string>('');
  public dialogStateObservable = this.dialogState.asObservable();
  constructor(public override dialog: MatDialog) {
    super(dialog);
  }

  public openDialogForComponent<T = unknown>(
    contentComponent: ComponentType<unknown>,
    data?: T,
    width = '80vw',
    height = '80vh',
  ): Promise<DialogData<T>> {
    return this.openDialog('anyDialog', contentComponent, true, data, {
      width,
      height,
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

  public openMetadataViewDialog(): Promise<DialogData> {
    return this.openDialog('metadataView', MetadataFileViewComponent);
  }

  public openLoginDialogComponent(): Promise<DialogData> {
    return this.openDialog(
      'loginCopmonent',
      DialogLoginComponent,
      false,
      null,
      {
        width: '40vw',
        height: 'auto',
      },
      'login-backdrop',
    );
  }

  public handleDelete(): void {
    this.openDialog('delete', DialogDeleteComponent, false, {
      width: '450px',
      height: '275px',
    });
    this.dialogStateObservable.subscribe((result) => {
      if (Boolean(result) && result === 'delete') {
        // TODO: add delete method to remove from DB
      }
    });
  }

  public handleAddContact(): void {
    this.openDialog(
      'addContact',
      DialogAddContactComponent,
      true,
      {
        width: '700px',
        height: '650px',
      },
      // initEmptyContactObj(),
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
      'addPerson',
      DialogAddPersonComponent,
      true,
      {
        width: '700px',
        height: '700px',
      },
      // initEmptyPersonObj(),
    );
    this.dialogStateObservable.subscribe((result) => {
      // TODO: save form data into DB
      if (result) {
        // do stuff
      }
    });
  }
}
