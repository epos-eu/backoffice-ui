import { Component, Inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../baseDialogService.abstract';

export interface NewWebservice {
  create: boolean;
}

@Component({
  selector: 'app-dataproduct-add-webservice',
  templateUrl: './dataproduct-add-webservice.component.html',
  styleUrls: ['./dataproduct-add-webservice.component.scss'],
})
export class DataproductAddWebserviceComponent {
  constructor(
    public dialogRef: MatDialogRef<DataproductAddWebserviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData<null, NewWebservice>,
  ) {}

  public form!: UntypedFormGroup;

  public handleClose(): void {
    this.data.close();
  }

  public handleCreate(): void {
    this.data.dataOut.create = true;
    this.data.close();
  }
}
