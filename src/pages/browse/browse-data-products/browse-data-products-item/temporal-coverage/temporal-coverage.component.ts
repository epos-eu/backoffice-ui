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
import { PeriodOfTime } from 'generated/backofficeSchemas';
import moment from 'moment';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { DataproductService } from '../../dataproduct.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-temporal-coverage',
  templateUrl: './temporal-coverage.component.html',
  styleUrl: './temporal-coverage.component.scss',
})
export class TemporalCoverageComponent implements OnInit {
  constructor(private entityExecutionService: EntityExecutionService, private dataproductService: DataproductService) {}

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
    console.log(this.dataProduct);
    this.formGroup = new FormGroup({
      coverage: this.createCoverageArray(this.dataProduct?.temporalExtent),
    });
    this.trackFormChanges();
  }

  private trackFormChanges(): void {
    const updatingObject = this.entityExecutionService.getActiveDataProductValue() || {};
    this.formGroup.valueChanges.pipe(debounceTime(500)).subscribe((changes) => {
      this.dataproductService.updateDataProductRecord(updatingObject, { temporalExtent: changes.coverage });
    });
  }

  private createCoverageArray(temporalExtent?: PeriodOfTime[] | undefined): UntypedFormArray {
    const arr = new UntypedFormArray([]);
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
    return arr;
  }
}
