import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { Operation } from 'src/apiAndObjects/objects/entities/operation.model';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';
import { DialogData } from 'src/components/dialogs/baseDialogService.abstract';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { StateChangeService } from 'src/services/stateChange.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
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
  @Input() templateUpdate = new Subject<string>();
  @Output() template = new Subject<string>();
  @Output() mappingVals = new Subject<Array<Mapping> | undefined>();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private entityExecutionService: EntityExecutionService,
    private dialogService: DialogService,
    private stateChangeService: StateChangeService,
  ) {
    this.stateChangeService.currentDataProductStateObs.subscribe((state: State | null) => {
      if (state === null || state === State.PUBLISHED || state === State.ARCHIVED) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    });
  }

  private operation!: Operation;
  public paramsForm!: UntypedFormGroup;
  public mapping?: Mapping[];
  public rangeEnum = OperationParamsRange;
  public fetchingOperation = false;
  public disabled = false;
  public disableOperationSave = true;

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
            this.operation = this.entityExecutionService.convertToOperation(operation);
            this.entityExecutionService.setActiveOperation(this.operation);
            this.template?.next(this.operation.template ? this.operation.template : '');
            this.mapping = this.operation.mapping;
            this.mappingVals.next(this.operation.mapping);
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
      // template: this.template,
    });
    // this.paramsForm.valueChanges.subscribe((changes) => {
    //   // this.updateTemplate(changes['template']);
    // });
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

  public cacheParam(updatedMapping: Mapping) {
    const activeSupportedOperation = this.entityExecutionService.getActiveOperationValue();
    if (null != activeSupportedOperation) {
      const updatedMappingArray = activeSupportedOperation?.mapping?.map((item: Mapping) =>
        item.variable === updatedMapping.variable ? updatedMapping : item,
      );
      activeSupportedOperation.mapping = updatedMappingArray as Array<Mapping>;

      const nullsOrEmptyExist = (map: Mapping) => map.label == null || map.label === '';
      this.disableOperationSave = activeSupportedOperation.mapping.some(nullsOrEmptyExist);

      /** Sets all null values as undefined */
      activeSupportedOperation?.mapping.map((mappingObj: Record<string, unknown>) => {
        Object.keys(mappingObj).forEach((key) => {
          if (null == mappingObj[key]) {
            mappingObj[key] = undefined;
          }
        });
        return mappingObj;
      });
      this.entityExecutionService.setActiveOperation(activeSupportedOperation);
    }
  }

  public handleSave(): void {
    this.entityExecutionService.handleOperationSave();
  }

  public handleAddParam(): void {
    this.dialogService.openAddNewParameterDialog().then((data: DialogData) => {
      const newMapping = data.dataOut as Mapping;
      if (null != newMapping) {
        const newMappingArr = this.entityExecutionService.getActiveOperationValue()?.mapping;
        newMappingArr?.push(newMapping);
        this.mapping = newMappingArr as Array<Mapping>;
        this.initForm();

        // add new variable on template string
        this.addMappingOnTemplate(newMapping);
      }
    });
  }

  /**
   * The `deleteOperation` function deletes an operation instance and updates the supported operations
   * list.
   * @param {string} instanceId - The `instanceId` parameter is a string that represents the unique
   * identifier of the operation instance that needs to be deleted.
   */
  public deleteOperation(instanceId: string): void {
    this.dialogService.handleDelete(instanceId, EntityEndpointValue.OPERATION, false).then((toDelete: boolean) => {
      if (toDelete) {
        // Delete from SupportedOperation array on @Webservice
        const activeWebservice = this.entityExecutionService.getActiveWebServiceValue();
        if (null != activeWebservice) {
          activeWebservice.supportedOperation?.splice(
            activeWebservice.supportedOperation.findIndex((e) => e.instanceId === instanceId),
            1,
          );
          this.entityExecutionService.setActiveWebService(activeWebservice);
        }

        // Delete from accessURL array on @Distribution
        const activeDistribution = this.entityExecutionService.getActiveDistributionValue();
        if (null != activeDistribution) {
          activeDistribution.accessURL?.splice(
            activeDistribution.accessURL.findIndex((e) => e.instanceId === instanceId),
            1,
          );
          this.entityExecutionService.setActiveDistribution(activeDistribution);
        }
      }
    });
  }
}
