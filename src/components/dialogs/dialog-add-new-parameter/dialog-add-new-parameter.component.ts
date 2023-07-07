import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../baseDialogService.abstract';
import { OperationParamsRange } from 'src/utility/enums/operationParamsRange.enum';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { OperationsService } from 'src/services/operations.service';
import { Operation } from 'src/apiAndObjects/objects/entities/operation.model';

@Component({
  selector: 'app-dialog-add-new-parameter',
  templateUrl: './dialog-add-new-parameter.component.html',
  styleUrls: ['./dialog-add-new-parameter.component.scss'],
})
export class DialogAddNewParameterComponent implements OnInit {
  public ranges = Object.values(OperationParamsRange);
  public form!: UntypedFormGroup;
  public duplicateName = false;
  public forbiddenName = '';
  private activeMappingArr: Array<string> = [];
  private mapping: Mapping = { range: '', variable: '', required: '' };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData<Mapping>,
    private readonly formBuilder: FormBuilder,
    private operationService: OperationsService,
  ) {
    this.operationService.operationObs.subscribe((operation: Operation | null) => {
      if (operation && operation.mapping) {
        this.activeMappingArr = operation.mapping.map((mapping: Mapping) => mapping.variable);
      }
    });
  }

  public ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      variable: new FormControl(this.mapping.variable, [Validators.required]),
      range: new FormControl(this.mapping.range, Validators.required),
      required: new FormControl(false),
    });
    this.form.valueChanges.subscribe((changes) => {
      this.checkForSameVariableName(changes['variable']);
      this.mapping.variable = changes['variable'];
      this.mapping.range = changes['range'];
      this.mapping.required = changes['required'].toString();
      this.data.dataOut = this.mapping;
    });
  }

  public handleCancel(): void {
    this.data.dataOut = null;
    this.data.close();
  }

  public handleAdd(): void {
    this.data.close();
  }

  public checkForSameVariableName(value: string) {
    this.duplicateName = this.activeMappingArr.includes(value);
  }
}
