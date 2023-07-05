import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';
import { OperationsService } from 'src/services/operations.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { OperationParamsRange } from 'src/utility/enums/operationParamsRange.enum';

@Component({
  selector: 'app-operation-parameters',
  templateUrl: './operation-parameters.component.html',
  styleUrls: ['./operation-parameters.component.scss'],
})
export class OperationParametersComponent implements OnInit {
  @Input() instanceId = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private operationsService: OperationsService,
  ) {}

  private operation!: OperationDetailDataSource;
  private template!: string;
  private mappingChanges: Array<Mapping> = [];
  public paramsForm!: UntypedFormGroup;
  public mapping!: Mapping[];
  public rangeEnum = OperationParamsRange;
  public fetchingOperation = false;

  public getControls(field: string) {
    return (this.paramsForm.get(field) as FormArray).controls;
  }

  private initData(): void {
    if (this.instanceId && !this.operation) {
      this.fetchingOperation = true;
      this.apiService.endpoints[Entity.OPERATION].get
        .call({ instanceId: this.instanceId }, false)
        .then((data: Array<OperationDetailDataSource>) => {
          this.fetchingOperation = false;
          const operation = data.shift();
          if (typeof operation !== 'undefined') {
            this.operationsService.setActiveOperation(operation);
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
      maxValue: [mapping.maxValue],
      minValue: [mapping.minValue],
      multipleValues: [mapping.multipleValues],
      paramValue: [mapping.paramValue],
      readOnlyValue: [mapping.readOnlyValue],
      required: [mapping.required],
      valuePattern: [mapping.valuePattern],
      variable: [mapping.variable],
      property: [mapping.property],
    });
  }

  private loadMappingArray(mapping: Array<Mapping>): FormGroup[] {
    const transformed = mapping.map((item: Mapping) => this.createMappingFormGroup(item));
    return transformed;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  public cacheParam(updatedMapping: Mapping) {
    const activeSupportedOperation = this.operationsService.getActiveOperation();
    const updatedMappingArray = activeSupportedOperation?.mapping?.map((item: Mapping) =>
      /** Finds item in Mapping array and replaces the item in the array with the updated item */
      item.variable === updatedMapping.variable ? updatedMapping : item,
    );
    if (null != activeSupportedOperation?.mapping) {
      Object.assign(activeSupportedOperation?.mapping, updatedMappingArray);
      this.operationsService.setActiveOperation(activeSupportedOperation);
      console.debug(activeSupportedOperation);
    }
  }
}
