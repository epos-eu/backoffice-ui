import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';
import { FormatRangePipe } from 'src/pipes/formatRange.pipe';
import { SemanticTag } from 'src/utility/enums/semanticTag.enum';

@Component({
  selector: 'app-option-date',
  templateUrl: './option-date.component.html',
  styleUrls: ['./option-date.component.scss'],
})
export class OptionDateComponent implements OnInit {
  @Input() param!: Mapping;
  @Input() disabled = false;
  @Output() updatedParam = new Subject<Mapping>();

  public paramForm!: UntypedFormGroup;
  public semanticTags = Object.values(SemanticTag);

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
      property: new FormControl(this.param.property),
      minValue: new FormControl(this.param.minValue),
      maxValue: new FormControl(this.param.maxValue),
      defaultValue: new FormControl(this.param.defaultValue),
    });
    this.paramForm.valueChanges.subscribe((changes) => {
      const changedObject = changes as Mapping;
      this.param.label = changedObject.label;
      this.param.variable = changedObject.variable;
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
