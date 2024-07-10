import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { Operation } from 'generated/backofficeSchemas';
import { Subject } from 'rxjs/internal/Subject';
import { FormatRangePipe } from 'src/pipes/formatRange.pipe';

@Component({
  selector: 'app-option-boolean',
  templateUrl: './option-boolean.component.html',
  styleUrls: ['./option-boolean.component.scss'],
})
export class OptionBooleanComponent implements OnInit {
  @Input() param!: Operation['mapping'];
  @Input() disabled = false;
  @Output() updatedParam = new Subject<Operation['mapping']>();

  public paramForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private rangePipe: FormatRangePipe) {}

  public ngOnInit(): void {
    this.initForm();
    this.disabled ? this.paramForm.disable() : this.paramForm.enable();
  }

  private initForm(): void {
    this.paramForm = this.formBuilder.group({
      label: new FormControl(this.param.label, Validators.required),
      range: new FormControl({ value: this.rangePipe.transform(this.param.range), disabled: true }),
      variable: new FormControl({ value: this.param.variable, disabled: true }),
      required: new FormControl(this.param.required === 'true'),
      readOnlyValue: new FormControl(this.param.readOnlyValue === 'true'),
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
