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
import moment, { Moment } from 'moment';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { DataproductService } from '../../dataproduct.service';
import { debounceTime } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { GetPeriodOfTimeParams } from 'src/apiAndObjects/api/periodOfTime/getPeriodOfTime';
import { SpatialTemporalEntityExecutionService } from 'src/services/calls/spatial-temporal-entity-execution.service';

@Component({
  selector: 'app-temporal-coverage',
  templateUrl: './temporal-coverage.component.html',
  styleUrl: './temporal-coverage.component.scss',
})
export class TemporalCoverageComponent implements OnInit {
  @Input() dataProduct!: DataProduct;
  @Input() inputsDisabled = false;

  public formGroup!: FormGroup;

  private startDate: Moment | null;
  private endDate: Moment | null;

  private temporalExtents: Array<PeriodOfTime> = [];

  constructor(
    private entityExecutionService: EntityExecutionService,
    private dataproductService: DataproductService,
    private apiService: ApiService,
    private spatialTemporalEntityExecutionService: SpatialTemporalEntityExecutionService,
  ) {
    this.startDate = null;
    this.endDate = null;
  }

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
          singleOptionOnly: true,
          instanceId: periodOfTime.instanceId as string,
          metaId: periodOfTime.metaId as string,
        };

        this.apiService.endpoints.PeriodOfTime.get.call(params).then((items: Array<PeriodOfTime>) => {
          this.temporalExtents.push(items[0]);
          this.startDate = moment(items[0].startDate);
          this.endDate = moment(items[0].endDate);
          this.formGroup = new FormGroup({
            coverage: this.createCoverageArray(items),
          });
          this.trackFormChanges();
        });
      });
    }
  }

  public handleSave(index?: number) {
    /* If the `temporalExtent` property of the `dataProduct` object is empty, it means that there are no existing temporal extents
associated with the data product and POST fn is called..  */
    if (null == this.dataProduct.temporalExtent || this.dataProduct.temporalExtent.length === 0) {
      const newPeriodOfTime: PeriodOfTime = {
        startDate: this.startDate ? this.startDate.toISOString() : undefined,
        endDate: this.endDate ? this.endDate.toISOString() : undefined,
      };
      this.apiService.endpoints.PeriodOfTime.create.call(newPeriodOfTime).then((temporalCoverage) => {
        const updatingObject = this.entityExecutionService.getActiveDataProductValue() || {};
        this.dataproductService.updateDataProductRecord(updatingObject, { temporalExtent: [temporalCoverage] });
      });
      /* If the `temporalExtent` property of the `dataProduct` object has a value, the relevant temporal extent is updated and PUT fn is called. */
    } else {
      const extentToUpdate = this.temporalExtents[index!];
      extentToUpdate.startDate = this.startDate ? this.startDate.toISOString() : undefined;
      extentToUpdate.endDate = this.endDate ? this.endDate.toISOString() : undefined;

      this.spatialTemporalEntityExecutionService.handleTemporalSave(extentToUpdate);
      this.apiService.endpoints.PeriodOfTime.update.call(extentToUpdate);
    }
  }

  private trackFormChanges(): void {
    this.formGroup.valueChanges.pipe(debounceTime(500)).subscribe((changes) => {
      this.startDate = changes.coverage[0].startDate;
      this.endDate = changes.coverage[0].endDate;
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
