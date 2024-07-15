/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControlOptions,
  UntypedFormArray,
} from '@angular/forms';
import { LinkedEntity, PeriodOfTime } from 'generated/backofficeSchemas';
import moment from 'moment';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { DataproductService } from '../../dataproduct.service';
import { debounceTime } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { GetPeriodOfTimeParams } from 'src/apiAndObjects/api/periodOfTime/getPeriodOfTime';

@Component({
  selector: 'app-temporal-coverage',
  templateUrl: './temporal-coverage.component.html',
  styleUrl: './temporal-coverage.component.scss',
})
export class TemporalCoverageComponent implements OnInit {
  constructor(
    private entityExecutionService: EntityExecutionService,
    private dataproductService: DataproductService,
    private apiService: ApiService,
  ) {}

  @Input() dataProduct!: DataProduct;

  public formGroup!: FormGroup;

  private dateComparison(start: string, end: string): (group: FormGroup) => { [key: string]: any } | null {
    return (group: FormGroup): { [key: string]: any } | null => {
      const startCtrl = group.controls[start];
      const endCtrl = group.controls[end];
      if (startCtrl.value && endCtrl.value) {
        if (moment(startCtrl.value).isAfter(endCtrl.value)) {
          startCtrl.markAsTouched();
          endCtrl.markAsTouched();
          return {
            dates: 'Start date needs to be before end date.',
          };
        }
      }
      return null;
    };
  }

  public getControls(field: string) {
    return (this.formGroup.get(field) as FormArray).controls;
  }

  public ngOnInit(): void {
    if (null == this.dataProduct.temporalExtent || this.dataProduct.temporalExtent.length === 0) {
      this.formGroup = new FormGroup({
        coverage: this.createCoverageArray(),
      });
      this.trackFormChanges();
    } else {
      this.dataProduct.temporalExtent.forEach((periodOfTime: LinkedEntity) => {
        const params: GetPeriodOfTimeParams = {
          instanceId: periodOfTime.instanceId as string,
          metaId: periodOfTime.metaId as string,
        };

        this.apiService.endpoints.PeriodOfTime.get.call(params).then((items: Array<PeriodOfTime>) => {
          this.formGroup = new FormGroup({
            coverage: this.createCoverageArray(items),
          });
          this.trackFormChanges();
        });
      });
    }
  }

  private trackFormChanges(): void {
    const updatingObject = this.entityExecutionService.getActiveDataProductValue() || {};
    this.formGroup.valueChanges.pipe(debounceTime(500)).subscribe((changes) => {
      this.dataproductService.updateDataProductRecord(updatingObject, { temporalExtent: changes.coverage });
    });
  }

  private createCoverageArray(temporalExtent?: PeriodOfTime[] | undefined): UntypedFormArray {
    const arr = new UntypedFormArray([]);
    if (temporalExtent) {
      temporalExtent?.forEach((item) => {
        arr.push(
          new FormGroup(
            {
              startDate: new FormControl(item?.startDate, [Validators.required]),
              endDate: new FormControl(item?.endDate, [Validators.required]),
            },
            { validator: this.dateComparison('startDate', 'endDate') } as AbstractControlOptions,
          ),
        );
      });
    } else {
      arr.push(
        new FormGroup(
          {
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required]),
          },
          { validator: this.dateComparison('startDate', 'endDate') } as AbstractControlOptions,
        ),
      );
    }

    return arr;
  }
}
