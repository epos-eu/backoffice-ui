import { Component, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';

@Component({
  selector: 'app-option-datetime',
  templateUrl: './option-datetime.component.html',
  styleUrls: ['./option-datetime.component.scss'],
})
export class OptionDatetimeComponent implements OnInit {
  @Input() param!: Mapping;

  public paramForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.paramForm = this.formBuilder.group({
      label: this.param.label,
      variable: this.param.variable,
      required: new FormControl(this.param.required === 'true' ? true : false),
      readOnlyValue: new FormControl(this.param.readOnlyValue === 'true' ? true : false),
    });
  }
}
