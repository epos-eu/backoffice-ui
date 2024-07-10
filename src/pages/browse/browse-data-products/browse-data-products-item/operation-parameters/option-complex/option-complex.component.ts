import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { ActiveToggle } from '../toggle.interface';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-option-complex',
  templateUrl: './option-complex.component.html',
  styleUrl: './option-complex.component.scss',
})
export class OptionComplexComponent {
  @Input() id: string = '';

  @Input() form!: UntypedFormGroup;

  @Input() disableAddNewValue!: boolean;

  private clickedIndex!: number;

  public activeToggles: ActiveToggle[] = [];

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  public handleAddNewValue(): void {
    const value = this.form.get('value') as FormArray;
    value.push(
      new FormGroup({
        value: new FormControl(''),
        asDefault: new FormControl(false),
      }),
    );
  }

  public handleDefaultValue(event: MatSlideToggleChange, index: number): void {
    this.activeToggles = [];
    this.activeToggles.push({
      id: index,
      active: event.checked,
    });
  }

  public isChecked(index: number): boolean {
    return this.activeToggles.find((item) => item.id === index) != null;
  }

  public disableSelect(index: number): boolean {
    const canSelectMultiple = this.form.get('multipleValues')?.value === true;
    const selectedAsDefaults = this.getControls('value').filter((item) => item.value.asDefault === true);
    if (this.clickedIndex === index) {
      return false;
    }
    return !canSelectMultiple || selectedAsDefaults.length > 0;
  }
}
