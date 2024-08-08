import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { DataProduct, Mapping, Operation } from 'generated/backofficeSchemas';
import { Subject } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { LinkedEntity } from 'src/apiAndObjects/objects/entities/linkedEntity.model';
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
  @Input() supportedOperations: LinkedEntity[] | undefined = [];

  @Input() templateUpdate = new Subject<string>();

  @Output() template = new Subject<string>();

  @Output() mappingVals = new Subject<Mapping[] | undefined>();

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

  public mapping: Mapping[] = [];

  public rangeEnum = OperationParamsRange;

  public loading = false;

  public disabled = false;

  public getControls(field: string) {
    return (this.paramsForm.get(field) as FormArray).controls;
  }

  private initData(): void {
    this.loading = true;
    const requests: Promise<Operation[]>[] = [];
    this.supportedOperations?.forEach((item: LinkedEntity) => {
      requests.push(
        this.apiService.endpoints[Entity.OPERATION].get.call(
          {
            metaId: item.metaId as string,
            instanceId: item.instanceId as string,
          },
          false,
        ),
      );
    });
    Promise.all(requests)
      .then((value: Operation[][]) => {
        const operation = value.flat().shift();
        if (operation) {
          this.operation = operation;
          this.initDataCallback();
          this.loading = false;
        }
      })
      .catch(() => (this.loading = false));
  }

  private getMappingDetails(mapping: LinkedEntity[] | undefined): Promise<Mapping[] | null> {
    const mappingItem = mapping?.shift();
    if (mappingItem?.instanceId && mappingItem.metaId) {
      return this.apiService.endpoints[Entity.MAPPING].get
        .call(
          {
            instanceId: mappingItem?.instanceId,
            metaId: mappingItem?.metaId,
          },
          false,
        )
        .then((response: Mapping[]) => {
          return response;
        });
    }
    return Promise.resolve(null);
  }

  private initDataCallback(): void {
    this.entityExecutionService.setActiveOperation(this.operation);
    this.template?.next(this.operation.template ? this.operation.template : '');
    this.getMappingDetails(this.operation.mapping).then((mapping: Mapping[] | null) => {
      if (mapping) {
        this.mapping = mapping;
        this.mappingVals.next(mapping);
      }
    });
    this.initForm();
  }

  private createMappingFormGroup(mapping: Mapping): FormGroup {
    return this.formService.generateOptionForm(mapping);
  }

  private loadMappingArray(mapping: Mapping[]): FormGroup[] {
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

  private addMappingOnTemplate(mapping: Mapping) {
    // const groupParamsOnTemplate = this.foundListParametersOnTemplate();
    // if (groupParamsOnTemplate.length > 0) {
    //   const newString = groupParamsOnTemplate[0] + ',' + mapping.variable;
    //   const template = this.paramsForm.get('template')?.value as string;
    //   this.paramsForm.get('template')?.setValue(template.replace(groupParamsOnTemplate[0], newString));
    // }
  }

  public ngOnInit(): void {
    this.initData();
    this.stateChangeService.currentDataProductStateObs.subscribe((state: DataProduct['status'] | null) => {
      if (state === null || state === Status.PUBLISHED || state === Status.ARCHIVED) {
        this.paramsForm.disable();
        this.disabled = true;
      } else {
        this.disabled = false;
        this.paramsForm.enable();
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
    // this.dialogService.openAddNewParameterDialog().then((data: DialogData) => {
    //   const newMapping = data.dataOut as LinkedEntity[];
    //   if (null != newMapping) {
    //     const newMappingArr = this.entityExecutionService.getActiveOperationValue()?.mapping;
    //     newMappingArr?.push(newMapping);
    //     this.mapping = newMappingArr as Array<LinkedEntity[]>;
    //     this.initForm();
    //     // add new variable on template string
    //     this.addMappingOnTemplate(newMapping);
    //   }
    // });
  }

  public handleDeleteOperation(instanceId: string | undefined): void {
    if (instanceId) {
      this.dialogService.handleDelete(instanceId, EntityEndpointValue.OPERATION, false).then((toDelete: boolean) => {
        if (toDelete) {
          const activeWebservice = this.entityExecutionService.getActiveWebServiceValue();
          if (null != activeWebservice) {
            activeWebservice.supportedOperation?.splice(
              activeWebservice.supportedOperation.findIndex((e) => e.instanceId === instanceId),
              1,
            );
            this.entityExecutionService.setActiveWebService(activeWebservice);
          }

          const activeDistribution = this.entityExecutionService.getActiveDistributionValue();
          if (null != activeDistribution) {
            activeDistribution.accessURL?.splice(
              // activeDistribution.accessURL.findIndex((e) => e.instanceId === instanceId),
              1,
            );
            this.entityExecutionService.setActiveDistribution(activeDistribution);
          }
        }
      });
    }
  }
}
