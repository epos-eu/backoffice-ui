import { Component, Input, Output, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { ParametersFormService } from '../parameters-form.service';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
})
export class OptionComponent implements OnInit {
  @Input() id: string = '';
  @Input() param!: any;
  @Input() disabled = false;
  @Output() updatedParam = new Subject<any>();

  constructor(private formService: ParametersFormService) {}

  public optionForm!: UntypedFormGroup;

  public disableAddNewValue = false;

  public ngOnInit(): void {
    this.initForm();
    this.trackFormChanges();
    this.disabled ? this.optionForm.disable() : this.optionForm.enable();
  }

  private initForm(): void {
    this.optionForm = this.formService.generateOptionForm({});
    if (this.formService.checkBool(this.param.multipleValues)) {
      this.disableAddNewValue = true;
    }
  }

  private trackFormChanges(): void {
    this.optionForm.valueChanges.pipe(debounceTime(500)).subscribe((changes) => {
      if (changes.multipleValues && this.formService.checkBool(changes.multipleValues)) {
        this.disableAddNewValue = true;
      } else {
        this.disableAddNewValue = false;
      }
      this.param = {
        ...changes,
        required: changes.required.toString(),
        readOnlyValues: changes.readOnlyValue ? changes.readOnlyValue.toString() : '',
        multipleValues: changes.multipleValues ? changes.multipleValues.toString() : '',
      };
      this.updatedParam.next(this.param);
    });
  }
}
