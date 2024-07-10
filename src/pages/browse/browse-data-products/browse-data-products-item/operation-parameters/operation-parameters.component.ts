import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { DataProduct, Operation } from 'generated/backofficeSchemas';
import { Subject } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { LinkedEntity } from 'src/apiAndObjects/objects/entities/linkedEntity.model';
import { DialogData } from 'src/components/dialogs/baseDialogService.abstract';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { StateChangeService } from 'src/services/stateChange.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { OperationParamsRange } from 'src/utility/enums/operationParamsRange.enum';
import { Status } from 'src/utility/enums/status.enum';
import { ParametersFormService } from './parameters-form.service';

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
  @Output() mappingVals = new Subject<LinkedEntity[] | undefined>();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private entityExecutionService: EntityExecutionService,
    private dialogService: DialogService,
    private stateChangeService: StateChangeService,
    private formService: ParametersFormService,
  ) {}

  private operation!: Operation;

  public paramsForm!: UntypedFormGroup;

  public mapping: LinkedEntity[] = [];

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
        .then((data: Array<Operation>) => {
          const operation = data.shift();
          if (null != operation) {
            this.fetchingOperation = false;
            this.operation = this.entityExecutionService.convertToOperation(operation);
            this.entityExecutionService.setActiveOperation(this.operation);
            this.template?.next(this.operation.template ? this.operation.template : '');
            // this.mapping.push(
            //   new LinkedEntity(
            //     this.operation.mapping?.[0].entityType as string,
            //     this.operation.mapping?.[0].instanceId as string,
            //     this.operation.mapping?.[0].metaId as string,
            //     this.operation.mapping?.[0].uid as string,
            //   ),
            // );
            this.mappingVals.next(this.operation.mapping);
            this.initForm();
            this.disabled ? this.paramsForm.disable() : this.paramsForm.enable();
          }
        });
    }
  }

  private createMappingFormGroup(mapping: LinkedEntity[]): FormGroup {
    return this.formService.generateOptionForm(mapping);
  }

  private loadMappingArray(mapping: Array<LinkedEntity[]> | undefined): FormGroup[] {
    if (mapping) {
      const transformed = mapping.map((item: LinkedEntity) => this.createMappingFormGroup(item));
      return transformed;
    }
    return [];
  }

  private initForm(): void {
    this.paramsForm = this.formBuilder.group({
      mapping: this.formBuilder.array(this.loadMappingArray(this.mapping)),
    });
  }

  private foundListParametersOnTemplate(): string[] {
    const template = this.paramsForm.get('template')?.value;
    const regex = /{([^}]+)}/g;
    const match = template.match(regex);
    if (match) {
      return match.map((m: any) => m.slice(1, -1));
    } else {
      return [];
    }
  }

  private addMappingOnTemplate(mapping: LinkedEntity[]) {
    const groupParamsOnTemplate = this.foundListParametersOnTemplate();
    if (groupParamsOnTemplate.length > 0) {
      const newString = groupParamsOnTemplate[0] + ',' + mapping.variable;
      const template = this.paramsForm.get('template')?.value as string;
      this.paramsForm.get('template')?.setValue(template.replace(groupParamsOnTemplate[0], newString));
    }
  }

  public ngOnInit(): void {
    this.initData();
    this.stateChangeService.currentDataProductStateObs.subscribe((state: DataProduct['status'] | null) => {
      if (state === null || state === Status.PUBLISHED || state === Status.ARCHIVED) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    });
  }

  public cacheParam(updatedMapping: LinkedEntity[]) {
    this.formService.cacheParam(updatedMapping);
  }

  public handleSave(): void {
    this.entityExecutionService.handleOperationSave();
  }

  public handleAddParam(): void {
    this.dialogService.openAddNewParameterDialog().then((data: DialogData) => {
      const newMapping = data.dataOut as LinkedEntity[];
      if (null != newMapping) {
        const newMappingArr = this.entityExecutionService.getActiveOperationValue()?.mapping;
        newMappingArr?.push(newMapping);
        this.mapping = newMappingArr as Array<LinkedEntity[]>;
        this.initForm();

        // add new variable on template string
        this.addMappingOnTemplate(newMapping);
      }
    });
  }

  public handleDeleteOperation(instanceId: string): void {
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
