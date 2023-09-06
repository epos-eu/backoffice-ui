import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Subject } from 'rxjs';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';

@Component({
  selector: 'app-option-integer',
  templateUrl: './option-integer.component.html',
  styleUrls: ['./option-integer.component.scss'],
})
export class OptionIntegerComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() param!: any;
  @Output() updatedParam = new Subject<Mapping>();

  constructor(private formBuilder: UntypedFormBuilder) {}

  private clickedIndex!: number;
  public form!: UntypedFormGroup;

  private checkBool(value: string | null): boolean {
    if (!value) {
      return false;
    }
    return value === 'false' ? false : true;
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      range: new FormControl({ value: this.param.range, disabled: true }),
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
    this.form.valueChanges.subscribe((changes) => {
      const changedObject = changes as Mapping;
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
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  public disableSelect(index: number): boolean {
    const canSelectMultiple = this.form.get('multipleValues')?.value === true;
    const selectedAsDefaults = this.getControls('value').filter((item) => item.value.asDefault === true);

    if (this.clickedIndex === index) {
      return false;
    }
    return !canSelectMultiple || selectedAsDefaults.length > 0;
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

  public handleDefaultToggleChange(event: MatSlideToggleChange): void {
    const clickedIndex = Number(event.source._elementRef.nativeElement.id);
    if (event.checked === true) {
      this.clickedIndex = clickedIndex;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public checkAllowedValues(param: any): string {
    if (param.paramValue) {
      return param.paramValue.length > 0 ? 'controlled' : 'any';
    } else {
      return 'any';
    }
  }
}
