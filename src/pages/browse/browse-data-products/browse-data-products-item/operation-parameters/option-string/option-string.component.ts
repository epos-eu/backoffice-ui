import { Component, Input, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-option-string',
  templateUrl: './option-string.component.html',
  styleUrls: ['./option-string.component.scss'],
})
export class OptionStringComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() param!: any;

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
      readonly: [this.checkBool(this.param.readonly)],
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
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }
}
