import { AfterViewInit, Component, Inject, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialog } from './dialog.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialog, public dialogRef: MatDialogRef<DialogComponent>) {}

  @ViewChild('dialogContent', { read: ViewContainerRef }) dialogContent!: ViewContainerRef;
  @ViewChild('deleteAction', { read: TemplateRef }) deleteAction!: TemplateRef<Element>;
  @ViewChild('formAddAction', { read: TemplateRef }) formAddAction!: TemplateRef<any>;

  public handleCancel() {
    this.handleClose('cancel');
  }

  public handleConfirm() {
    this.handleClose('confirm');
  }

  public handleClose(button: 'cancel' | 'confirm') {
    this.dialogRef.close(button);
  }

  ngAfterViewInit() {
    switch (true) {
      case this.data.type === 'delete':
        this.dialogContent.createEmbeddedView(this.deleteAction);
        break;
      case this.data.type === 'form-add':
        this.dialogContent.createEmbeddedView(this.formAddAction, {
          person: this.data.content,
        });
        break;
    }
  }
}
