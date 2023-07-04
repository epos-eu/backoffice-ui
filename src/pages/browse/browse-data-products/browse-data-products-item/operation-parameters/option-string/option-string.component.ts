import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';

@Component({
  selector: 'app-option-string',
  templateUrl: './option-string.component.html',
  styleUrls: ['./option-string.component.scss'],
})
export class OptionStringComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() param!: any;
  @Output() udpatedParam = new Subject<Mapping>();

  constructor(private formBuilder: UntypedFormBuilder) {}

  public form!: UntypedFormGroup;

  private checkBool(value: string | null): boolean {
    if (!value) {
      return false;
    }
    return value === 'false' ? false : true;
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      label: [this.param.label],
      required: [this.checkBool(this.param.required)],
      readOnlyValue: [this.checkBool(this.param.readOnlyValue)],
      allowedValues: [this.param.paramValue.length > 0 ? 'controlled' : 'any'],
      defaultValue: [this.param.defaultValue],
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
      this.param.range = changedObject.range;
      this.param.required = changedObject.required;
      this.param.readOnlyValue = changedObject.readOnlyValue;
      this.param.property = changedObject.property;
      this.param.minValue = changedObject.minValue;
      this.param.maxValue = changedObject.maxValue;
      this.param.defaultValue = changedObject.defaultValue;
      this.param.multipleValues = changedObject.multipleValues;
      this.udpatedParam.next(this.param);
    });
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }
}
