import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';
import { FormatRangePipe } from 'src/pipes/formatRange.pipe';

@Component({
  selector: 'app-option-float',
  templateUrl: './option-float.component.html',
  styleUrls: ['./option-float.component.scss'],
})
export class OptionFloatComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() param!: any;
  @Input() disabled = false;
  @Output() updatedParam = new Subject<Mapping>();

  constructor(private formBuilder: UntypedFormBuilder, private rangePipe: FormatRangePipe) {}

  public form!: UntypedFormGroup;
  public hideAddNewValue = false;

  private checkBool(value: string | null): boolean {
    if (!value) {
      return false;
    }
    return value !== 'false';
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      range: new FormControl({ value: this.rangePipe.transform(this.param.range), disabled: true }),
      variable: new FormControl({ value: this.param.variable, disabled: true }),
      label: new FormControl(this.param.label, Validators.required),
      required: [this.checkBool(this.param.required)],
      readOnlyValue: [this.checkBool(this.param.readOnlyValue)],
      allowedValues: [this.checkAllowedValues(this.param)],
      defaultValue: [this.param.defaultValue],
      minValue: [this.param.minValue],
      maxValue: [this.param.maxValue],
      multipleValues: [this.checkBool(this.param.multipleValues)],
      value: this.formBuilder.array([
        this.formBuilder.group({
          value: ['', Validators.required],
          asDefault: [false, Validators.required],
        }),
      ]),
    });

    if (this.checkBool(this.param.multipleValues)) {
      this.hideAddNewValue = true;
    }

    this.form.valueChanges.subscribe((changes) => {
      const changedObject = changes as Mapping;

      if (changedObject.multipleValues && this.checkBool(changedObject.multipleValues)) {
        this.hideAddNewValue = true;
      } else {
        this.hideAddNewValue = false;
      }

      this.param.label = changedObject.label;
      this.param.required = changedObject.required.toString();
      this.param.readOnlyValue = changedObject.readOnlyValue ? changedObject.readOnlyValue.toString() : '';
      this.param.minValue = changedObject.minValue;
      this.param.maxValue = changedObject.maxValue;
      this.param.defaultValue = changedObject.defaultValue;
      this.param.multipleValues = changedObject.multipleValues ? changedObject.multipleValues.toString() : '';
      this.updatedParam.next(this.param);
    });
  }

  public ngOnInit(): void {
    this.initForm();
    this.disabled ? this.form.disable() : this.form.enable();
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public checkAllowedValues(param: any): string {
    if (param.paramValue) {
      return param.paramValue.length > 0 ? 'controlled' : 'any';
    } else {
      return 'any';
    }
  }

  public handleAddNewValue(): void {
    const value = this.form.get('value') as FormArray;
    value.push(
      this.formBuilder.group({
        value: '',
        asDefault: false,
      }),
    );
  }
}
