import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { Operation } from 'src/apiAndObjects/objects/entities/operation.model';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';
import { DialogData } from 'src/components/dialogs/baseDialogService.abstract';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { OperationsService } from 'src/services/operations.service';
import { StateChangeService } from 'src/services/stateChange.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { OperationParamsRange } from 'src/utility/enums/operationParamsRange.enum';
import { State } from 'src/utility/enums/state.enum';

@Component({
  selector: 'app-operation-parameters',
  templateUrl: './operation-parameters.component.html',
  styleUrls: ['./operation-parameters.component.scss'],
})
export class OperationParametersComponent implements OnInit {
  @Input() instanceId = '';
  @Input() metaId = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private operationsService: OperationsService,
    private dialogService: DialogService,
    private stateChangeService: StateChangeService,
  ) {
    this.stateChangeService.currentDataProductStateObs.subscribe((state: State | null) => {
      if (state === null || state === State.PUBLISHED) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    });
  }

  private operation!: Operation;
  private template?: string;
  public paramsForm!: UntypedFormGroup;
  public mapping?: Mapping[];
  public rangeEnum = OperationParamsRange;
  public fetchingOperation = false;
  public disabled = false;

  public getControls(field: string) {
    return (this.paramsForm.get(field) as FormArray).controls;
  }

  private initData(): void {
    if (this.instanceId && !this.operation) {
      this.fetchingOperation = true;
      this.apiService.endpoints[Entity.OPERATION].get
        .call({ metaId: this.metaId, instanceId: this.instanceId }, false)
        .then((data: Array<OperationDetailDataSource>) => {
          const operation = data.shift();
          if (null != operation) {
            this.fetchingOperation = false;
            this.operation = this.operationsService.convertToOperation(operation);
            this.operationsService.setActiveOperation(this.operation);
            this.template = this.operation.template;
            this.mapping = this.operation.mapping;
            this.initForm();
            this.disabled ? this.paramsForm.disable() : this.paramsForm.enable();
          }
        });
    }
  }

  private createMappingFormGroup(mapping: Mapping): FormGroup {
    return this.formBuilder.group({
      defaultValue: [
        {
          value: mapping.defaultValue,
          disabled: mapping.readOnlyValue === 'true',
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

  private loadMappingArray(mapping: Array<Mapping> | undefined): FormGroup[] {
    if (mapping) {
      const transformed = mapping.map((item: Mapping) => this.createMappingFormGroup(item));
      return transformed;
    }
    return [];
  }

  private initForm(): void {
    this.paramsForm = this.formBuilder.group({
      mapping: this.formBuilder.array(this.loadMappingArray(this.mapping)),
      template: this.template,
    });
    this.paramsForm.valueChanges.subscribe((changes) => {
      this.updateTemplate(changes['template']);
    });
  }

  private foundListParametersOnTemplate(): string[] {
    const template = this.paramsForm.get('template')?.value;
    const regex = /{([^}]+)}/g;
    const match = template.match(regex);

    if (match) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return match.map((m: any) => m.slice(1, -1));
    } else {
      return [];
    }
  }

  private addMappingOnTemplate(mapping: Mapping) {
    const groupParamsOnTemplate = this.foundListParametersOnTemplate();
    if (groupParamsOnTemplate.length > 0) {
      const newString = groupParamsOnTemplate[0] + ',' + mapping.variable;
      const template = this.paramsForm.get('template')?.value as string;
      this.paramsForm.get('template')?.setValue(template.replace(groupParamsOnTemplate[0], newString));
    }
  }

  public ngOnInit(): void {
    this.initData();
  }

  public getDateControl(dateStr: string): FormControl {
    return new FormControl(new Date(dateStr));
  }

  public updateTemplate(template: string) {
    const activeSupportedOperation = this.operationsService.getActiveOperationValue();
    if (null != activeSupportedOperation) {
      activeSupportedOperation.template = template;
      this.operationsService.setActiveOperation(activeSupportedOperation);
    }
  }

  public cacheParam(updatedMapping: Mapping) {
    const activeSupportedOperation = this.operationsService.getActiveOperationValue();
    if (null != activeSupportedOperation) {
      const updatedMappingArray = activeSupportedOperation?.mapping?.map((item: Mapping) =>
        item.variable === updatedMapping.variable ? updatedMapping : item,
      );
      activeSupportedOperation.mapping = updatedMappingArray as Array<Mapping>;
      /** Sets all null values as undefined */
      activeSupportedOperation?.mapping.map((mappingObj: Record<string, unknown>) => {
        Object.keys(mappingObj).forEach((key) => {
          if (null == mappingObj[key]) {
            mappingObj[key] = undefined;
          }
        });
        return mappingObj;
      });
      this.operationsService.setActiveOperation(activeSupportedOperation);
    }
  }

  public handleSave(): void {
    this.operationsService.handleOperationSave();
  }

  public handleAddParam(): void {
    this.dialogService.openAddNewParameterDialog().then((data: DialogData) => {
      const newMapping = data.dataOut as Mapping;
      if (null != newMapping) {
        const newMappingArr = this.operationsService.getActiveOperationValue()?.mapping;
        newMappingArr?.push(newMapping);
        this.mapping = newMappingArr as Array<Mapping>;
        this.initForm();

        // add new variable on template string
        this.addMappingOnTemplate(newMapping);
      }
    });
  }
}
