import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-option-float',
  templateUrl: './option-float.component.html',
  styleUrls: ['./option-float.component.scss'],
})
export class OptionFloatComponent {
  @Input() form!: UntypedFormGroup;
  @Input() disableAddNewValue!: boolean;

  public handleAddNewValue(): void {
    const value = this.form.get('value') as FormArray;
    value.push(
      new FormGroup({
        value: new FormControl(''),
        asDefault: new FormControl(false),
      }),
    );
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }
}
