/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { NgxMatDatetimepicker } from '@angular-material-components/datetime-picker';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-clear-datepicker',
  templateUrl: './clear-datepicker.component.html',
  styleUrls: ['./clear-datepicker.component.scss'],
})
export class ClearDatepickerComponent {
  @Input() value!: NgxMatDatetimepicker<any>;
  @Input() inputDisabled = false;
  @Output() onClear = new EventEmitter<unknown>();

  public handleClearDate(): void {
    this.onClear.emit();
  }
}
