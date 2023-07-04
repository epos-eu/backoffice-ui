import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';
import { OperationParamsRange } from 'src/utility/enums/operationParamsRange.enum';
import { SemanticTag } from 'src/utility/enums/semanticTag.enum';

@Component({
  selector: 'app-option-datetime',
  templateUrl: './option-datetime.component.html',
  styleUrls: ['./option-datetime.component.scss'],
})
export class OptionDatetimeComponent implements OnInit {
  @Input() param!: Mapping;
  @Output() udpatedParam = new Subject<Mapping>();

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
    this.paramForm.valueChanges.subscribe((changes) => {
      const changess = changes as Mapping;
      this.param.label = changess.label;
      this.param.range = changess.range;
      this.param.variable = changess.variable;
      this.param.required = changess.required;
      this.param.readOnlyValue = changess.readOnlyValue;
      this.param.property = changess.property;
      this.param.minValue = changess.minValue;
      this.param.maxValue = changess.maxValue;
      this.param.defaultValue = changess.defaultValue;
      this.udpatedParam.next(this.param);
    });
  }
}
