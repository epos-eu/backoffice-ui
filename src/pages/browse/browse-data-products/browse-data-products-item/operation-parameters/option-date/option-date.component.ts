import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';
import { OperationParamsRange } from 'src/utility/enums/operationParamsRange.enum';
import { SemanticTag } from 'src/utility/enums/semanticTag.enum';

@Component({
  selector: 'app-option-date',
  templateUrl: './option-date.component.html',
  styleUrls: ['./option-date.component.scss'],
})
export class OptionDateComponent implements OnInit {
  @Input() param!: Mapping;
  @Output() updatedParam = new Subject<Mapping>();

  public paramForm!: UntypedFormGroup;
  public semanticTags = Object.values(SemanticTag);
  public ranges = Object.values(OperationParamsRange);

  constructor(private formBuilder: UntypedFormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.paramForm = this.formBuilder.group({
      label: new FormControl(this.param.label, Validators.required),
      range: new FormControl(this.param.range),
      variable: new FormControl(this.param.variable),
      required: new FormControl(this.param.required === 'true' ? true : false),
      readOnlyValue: new FormControl(this.param.readOnlyValue === 'true' ? true : false),
      property: new FormControl(this.param.property),
      minValue: new FormControl(this.param.minValue),
      maxValue: new FormControl(this.param.maxValue),
      defaultValue: new FormControl(this.param.defaultValue),
    });
    this.paramForm.valueChanges.subscribe((changes) => {
      const changedObject = changes as Mapping;
      this.param.label = changedObject.label;
      this.param.range = changedObject.range;
      this.param.variable = changedObject.variable;
      this.param.required = changedObject.required;
      this.param.readOnlyValue = changedObject.readOnlyValue;
      this.param.property = changedObject.property;
      this.param.minValue = changedObject.minValue;
      this.param.maxValue = changedObject.maxValue;
      this.param.defaultValue = changedObject.defaultValue;
      this.updatedParam.next(this.param);
    });
  }
}
