import { Component, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';
import { SemanticTag } from 'src/utility/enums/semanticTag.enum';

@Component({
  selector: 'app-option-datetime',
  templateUrl: './option-datetime.component.html',
  styleUrls: ['./option-datetime.component.scss'],
})
export class OptionDatetimeComponent implements OnInit {
  @Input() param!: Mapping;

  public paramForm!: UntypedFormGroup;
  public semanticTags = Object.values(SemanticTag);

  constructor(private formBuilder: UntypedFormBuilder) {}

  public ngOnInit(): void {
    console.debug(this.param.property);
    this.initForm();
  }
  private initForm(): void {
    this.paramForm = this.formBuilder.group({
      label: this.param.label,
      variable: this.param.variable,
      required: new FormControl(this.param.required === 'true' ? true : false),
      readOnlyValue: new FormControl(this.param.readOnlyValue === 'true' ? true : false),
      property: new FormControl(this.param.property),
      minValue: new FormControl(this.param.minValue),
      maxValue: new FormControl(this.param.maxValue),
      defaultValue: new FormControl(this.param.defaultValue),
    });
  }
}
