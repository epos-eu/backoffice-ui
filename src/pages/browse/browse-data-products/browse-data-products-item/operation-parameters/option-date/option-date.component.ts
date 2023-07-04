import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl } from '@angular/forms';
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

  public paramForm!: UntypedFormGroup;
  public semanticTags = Object.values(SemanticTag);
  public ranges = Object.values(OperationParamsRange);

  constructor(private formBuilder: UntypedFormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.paramForm = this.formBuilder.group({
      label: new FormControl(this.param.label),
      range: new FormControl(this.param.range),
      variable: new FormControl(this.param.variable),
      required: new FormControl(this.param.required === 'true' ? true : false),
      readOnlyValue: new FormControl(this.param.readOnlyValue === 'true' ? true : false),
      property: new FormControl(this.param.property),
      minValue: new FormControl(this.param.minValue),
      maxValue: new FormControl(this.param.maxValue),
      defaultValue: new FormControl(this.param.defaultValue),
    });
  }
}
