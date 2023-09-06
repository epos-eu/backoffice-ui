import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../baseDialogService.abstract';

export interface NewWebservice {
  uid: string;
}

@Component({
  selector: 'app-dataproduct-add-webservice',
  templateUrl: './dataproduct-add-webservice.component.html',
  styleUrls: ['./dataproduct-add-webservice.component.scss'],
})
export class DataproductAddWebserviceComponent implements OnInit {
  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<DataproductAddWebserviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData<null, NewWebservice>,
  ) {}

  public form!: UntypedFormGroup;

  public handleClose(): void {
    this.data.close();
  }

  public handleCreate(): void {
    this.data.dataOut.uid = this.form.get('uid')?.value;
    this.data.close();
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      uid: ['', Validators.required],
    });
  }
}
