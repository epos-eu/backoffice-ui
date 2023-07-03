import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';
import { Entity } from 'src/utility/enums/entity.enum';
import { OperationParamsRange } from 'src/utility/enums/operationParamsRange.enum';

@Component({
  selector: 'app-operation-parameters',
  templateUrl: './operation-parameters.component.html',
  styleUrls: ['./operation-parameters.component.scss'],
})
export class OperationParametersComponent implements OnInit {
  @Input() instanceId = '';

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  private operation!: OperationDetailDataSource;
  private template!: string;
  private mappingChanges: Array<Mapping> = [];
  public paramsForm!: UntypedFormGroup;
  public mapping!: Mapping[];
  public rangeEnum = OperationParamsRange;

  public getControls(field: string) {
    return (this.paramsForm.get(field) as FormArray).controls;
  }

  private initData(): void {
    if (this.instanceId && !this.operation) {
      this.apiService.endpoints[Entity.OPERATION].get
        .call({ instanceId: this.instanceId }, false)
        .then((data: Array<OperationDetailDataSource>) => {
          const operation = data.shift();
          if (typeof operation !== 'undefined') {
            this.operation = operation;
            this.template = this.operation.template;
            this.mapping = this.operation.mapping;
            this.initForm();
          }
        });
    }
  }

  private createMappingFormGroup(mapping: Mapping): FormGroup {
    return this.formBuilder.group({
      defaultValue: [
        {
          value: mapping.defaultValue,
          disabled: mapping.readOnlyValue === 'true' ? true : false,
        },
        mapping.required === 'true' ? Validators.required : '',
      ],
      label: [mapping.label],
      range: [mapping.range],
    });
  }

  private loadMappingArray(mapping: Array<Mapping>): FormGroup[] {
    const transformed = mapping.map((item: Mapping) => this.createMappingFormGroup(item));
    return transformed;
  }

  private trackFormChanges(changes: any): void {
    this.mappingChanges = changes.mapping;
  }

  private initForm(): void {
    this.paramsForm = this.formBuilder.group({
      mapping: this.formBuilder.array(this.loadMappingArray(this.mapping)),
      template: this.template,
    });
    this.paramsForm.valueChanges.subscribe((changes) => this.trackFormChanges(changes));
  }

  public ngOnInit(): void {
    this.initData();
  }

  public getDateControl(dateStr: string): FormControl {
    return new FormControl(new Date(dateStr));
  }
}
