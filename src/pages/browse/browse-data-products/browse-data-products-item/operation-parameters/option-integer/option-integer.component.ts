import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { ActiveToggle } from '../toggle.interface';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-option-integer',
  templateUrl: './option-integer.component.html',
  styleUrls: ['./option-integer.component.scss'],
})
export class OptionIntegerComponent {
  @Input() form!: UntypedFormGroup;
  @Input() disableAddNewValue!: boolean;
  @Input() disabled!: boolean;

  private clickedIndex!: number;
  public hideAddNewValue = false;
  public activeToggles: ActiveToggle[] = [];

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

  public disableSelect(index: number): boolean {
    const canSelectMultiple = this.form.get('multipleValues')?.value === true;
    const selectedAsDefaults = this.getControls('value').filter((item) => item.value.asDefault === true);

    if (this.clickedIndex === index) {
      return false;
    }
    return !canSelectMultiple || selectedAsDefaults.length > 0;
  }

  public allowChecked(index: number): boolean {
    return this.activeToggles.find((item) => item.id === index) != null;
  }

  public handleDefaultToggleChange(event: MatSlideToggleChange, index: number): void {
    const clickedIndex = Number(event.source._switchElement.nativeElement.id);
    if (event.checked === true) {
      this.clickedIndex = clickedIndex;
    }

    this.activeToggles = [];
    this.activeToggles.push({
      id: index,
      active: event.checked,
    });
  }
}
