import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { formatRangeText } from 'src/helpers/strings';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';

@Injectable({
  providedIn: 'root',
})
export class ParametersFormService {
  constructor(private formBuilder: FormBuilder, private entityExecutionService: EntityExecutionService) {}

  private disableOperationSave: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public disableOperationSaveObs = this.disableOperationSave.asObservable();

  private checkAllowedValues(parameter: any): string {
    if (parameter.paramValue) {
      return parameter.paramValue.length > 0 ? 'controlled' : 'any';
    } else {
      return 'any';
    }
  }

  public checkBool(value: string | null): boolean {
    if (!value) {
      return false;
    }
    return value !== 'false';
  }

  public generateOptionForm(parameter: any): FormGroup {
    return this.formBuilder.group({
      label: [parameter.label, [Validators.required]],
      range: [{ value: parameter.range, disabled: true }],
      variable: [{ value: parameter.variable, disabled: true }],
      required: [parameter.required === 'true'],
      readOnlyValue: [parameter.readOnlyValue === 'true'],
      defaultValue: [parameter.defaultValue],
      minValue: [parameter.minValue],
      maxValue: [parameter.maxValue],
      property: [parameter.property],
      allowedValues: [this.checkAllowedValues(parameter)],
      multipleValues: [this.checkBool(parameter.multipleValues)],
      value: this.formBuilder.array([
        this.formBuilder.group({
          value: ['', Validators.required],
          asDefault: [false, Validators.required],
        }),
      ]),
    });
  }

  public cacheParam(updatedMapping: any): void {
    const activeSupportedOperation = this.entityExecutionService.getActiveOperationValue();
    if (null != activeSupportedOperation) {
      const updatedMappingArray = activeSupportedOperation?.mapping?.map((item: any) =>
        item.variable === updatedMapping.variable ? updatedMapping : item,
      );
      activeSupportedOperation.mapping = updatedMappingArray as Array<any>;

      const nullsOrEmptyExist = (map: any) => map.label == null || map.label === '';
      this.disableOperationSave.next(activeSupportedOperation.mapping.some(nullsOrEmptyExist));

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
}
