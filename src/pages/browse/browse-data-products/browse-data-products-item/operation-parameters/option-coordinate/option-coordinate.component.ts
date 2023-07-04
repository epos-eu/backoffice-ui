import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';
import { CoordinateType } from 'src/utility/enums/coordinateType.enum';
import { OperationParamsRange } from 'src/utility/enums/operationParamsRange.enum';

@Component({
  selector: 'app-option-coordinate',
  templateUrl: './option-coordinate.component.html',
  styleUrls: ['./option-coordinate.component.scss'],
})
export class OptionCoordinateComponent implements OnInit {
  @Input() param!: Mapping;
  @Output() udpatedParam = new Subject<Mapping>();

  public paramForm!: UntypedFormGroup;
  public coordinateTypes = Object.values(CoordinateType);
  public ranges = Object.values(OperationParamsRange);

  constructor(private formBuilder: UntypedFormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.paramForm = this.formBuilder.group({
      label: new FormControl(this.param.label),
      range: new FormControl(this.param.range),
      variable: new FormControl(this.param.variable),
      required: new FormControl(this.param.required === 'true' ? true : false),
      readOnlyValue: new FormControl(this.param.readOnlyValue === 'true' ? true : false),
      property: new FormControl(this.param.property),
      minValue: new FormControl(this.param.minValue),
      maxValue: new FormControl(this.param.maxValue),
      defaultValue: new FormControl(this.param.defaultValue),
    });
    this.paramForm.valueChanges.subscribe((changes) => {
      const changedObject = changes as Mapping;
      this.param.label = changedObject.label;
      this.param.range = changedObject.range;
      this.param.variable = changedObject.variable;
      this.param.required = changedObject.required;
      this.param.readOnlyValue = changedObject.readOnlyValue;
      this.param.property = changedObject.property;
      this.param.minValue = changedObject.minValue;
      this.param.maxValue = changedObject.maxValue;
      this.param.defaultValue = changedObject.defaultValue;
      this.udpatedParam.next(this.param);
    });
  }
}
