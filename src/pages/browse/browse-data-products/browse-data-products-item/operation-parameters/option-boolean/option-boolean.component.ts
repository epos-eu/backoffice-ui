import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';
import { OperationParamsRange } from 'src/utility/enums/operationParamsRange.enum';
@Component({
  selector: 'app-option-boolean',
  templateUrl: './option-boolean.component.html',
  styleUrls: ['./option-boolean.component.scss'],
})
export class OptionBooleanComponent implements OnInit {
  @Input() param!: Mapping;
  @Input() disabled = false;
  @Output() updatedParam = new Subject<Mapping>();

  public paramForm!: UntypedFormGroup;
  public ranges = Object.values(OperationParamsRange);

  constructor(private formBuilder: UntypedFormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
    this.disabled ? this.paramForm.disable() : this.paramForm.enable();
  }

  private initForm(): void {
    this.paramForm = this.formBuilder.group({
      label: new FormControl(this.param.label, Validators.required),
      range: new FormControl({ value: this.param.range, disabled: true }),
      variable: new FormControl({ value: this.param.variable, disabled: true }),
      required: new FormControl(this.param.required === 'true' ? true : false),
      readOnlyValue: new FormControl(this.param.readOnlyValue === 'true' ? true : false),
      defaultValue: new FormControl(this.param.defaultValue),
    });
    this.paramForm.valueChanges.subscribe((changes) => {
      const changedObject = changes as Mapping;
      this.param.label = changedObject.label;
      this.param.required = changedObject.required.toString();
      this.param.readOnlyValue = changedObject.readOnlyValue ? changedObject.readOnlyValue.toString() : '';
      this.param.property = changedObject.property;
      this.param.minValue = changedObject.minValue;
      this.param.maxValue = changedObject.maxValue;
      this.param.defaultValue = changedObject.defaultValue;
      this.updatedParam.next(this.param);
    });
  }
}
