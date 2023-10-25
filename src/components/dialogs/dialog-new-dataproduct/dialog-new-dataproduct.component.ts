import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../baseDialogService.abstract';

interface NewDataProductDialog {
  create: boolean;
}

@Component({
  selector: 'app-dialog-new-dataproduct',
  templateUrl: './dialog-new-dataproduct.component.html',
  styleUrls: ['./dialog-new-dataproduct.component.scss'],
})
export class DialogNewDataproductComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<null, NewDataProductDialog>) {}

  public handleCancel(): void {
    this.data.dataOut.create = false;
    this.data.close();
  }

  public handleCreate(): void {
    this.data.dataOut.create = true;
    this.data.close();
  }
}
