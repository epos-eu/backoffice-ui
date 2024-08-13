/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControlOptions,
  UntypedFormArray,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { DataProduct, LinkedEntity, PeriodOfTime } from 'generated/backofficeSchemas';
import moment, { Moment } from 'moment';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { DataproductService } from '../../dataproduct.service';
import { debounceTime } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { GetPeriodOfTimeParams } from 'src/apiAndObjects/api/periodOfTime/getPeriodOfTime';
import { SpatialTemporalEntityExecutionService } from 'src/services/calls/spatial-temporal-entity-execution.service';
import { Status } from 'src/utility/enums/status.enum';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-temporal-coverage',
  templateUrl: './temporal-coverage.component.html',
  styleUrl: './temporal-coverage.component.scss',
})
export class TemporalCoverageComponent {
  @Input() dataProduct!: DataProduct | null;

  public dataProdAct!: boolean;
  @Input() set dataProductIsParent(value: boolean) {
    this.dataProdAct = value;
  }
  public temporalLinkedEntities: LinkedEntity[] = [];
  @Input() set spatialExtentInput(value: Array<LinkedEntity> | undefined) {
    if (value) {
      this.temporalLinkedEntities = value;
      this.init();
    }
  }

  private startDate!: Moment | null;

  private endDate!: Moment | null;

  private temporalExtents: Array<PeriodOfTime> = [];

  public form!: FormGroup;

  public disabled = true;

  constructor(
    private entityExecutionService: EntityExecutionService,
    private dataproductService: DataproductService,
    private apiService: ApiService,
    private spatialTemporalEntityExecutionService: SpatialTemporalEntityExecutionService,
    private loadingService: LoadingService,
  ) {}

  // private dateComparison(start, end): (group: FormGroup) => { [key: string]: any } | null {
  //   return (group: FormGroup): { [key: string]: any } | null => {
  //     const startCtrl = group.controls[start];
  //     const endCtrl = group.controls[end];
  //     if (startCtrl.value && endCtrl.value) {
  //       if (moment(startCtrl.value).isAfter(endCtrl.value)) {
  //         startCtrl.markAsTouched();
  //         endCtrl.markAsTouched();
  //         return {
  //           dates: 'Start date needs to be before end date.',
  //         };
  //       }
  //     }
  //     return null;
  //   };
  // }

  private dateComparisonArr(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const controlArray = control as FormArray;
      controlArray.controls.forEach((contorl) => {
        console.debug('test:', contorl);
      });
      // console.debug(controlArray);
      if (controlArray.controls.some((x) => x.value)) {
        return null;
      } else {
        return { valid: false };
      }
    };
  }

  // public dateRangeValidator(min: Date, max: Date): ValidatorFn {
  //   return (control) => {
  //     if (!control.value) return null;

  //     const dateValue = new Date(control.value);

  //     if (min && dateValue < min) {
  //       return { message: 'error message' };
  //     }

  //     if (max && dateValue > max) {
  //       return { message: 'error message' };
  //     }

  //     null;
  //   };
  // }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  private init(): void {
    this.startDate = null;
    this.endDate = null;
    this.checkForActiveTemporalVals();
    if (this.temporalLinkedEntities.length > 0) {
      this.initValidTemporalCoverage(this.temporalLinkedEntities);
    } else {
      this.form = new FormGroup({
        coverage: this.createCoverageArray(),
      });
      this.trackFormChanges();
    }
    // Disable form if parent DataProduct should not be edited.
    if (this.dataProduct?.status === Status.PUBLISHED || this.dataProduct?.status === Status.ARCHIVED) {
      this.form.disable();
    }
  }

  private checkForActiveTemporalVals(): void {
    if (this.dataProdAct) {
      const activeDataProduct = this.entityExecutionService.getActiveDataProductValue();
      if (activeDataProduct?.temporalExtent) {
        activeDataProduct.temporalExtent.length > 0
          ? this.temporalLinkedEntities.push(activeDataProduct.temporalExtent[0])
          : [];
      }
    } else {
      const activeWebService = this.entityExecutionService.getActiveWebServiceValue();
      if (activeWebService?.temporalExtent) {
        activeWebService.temporalExtent.length > 0
          ? this.temporalLinkedEntities.push(activeWebService.temporalExtent[0])
          : [];
      }
    }
  }

  private initValidTemporalCoverage(temporalExent: LinkedEntity[]) {
    temporalExent.forEach((periodOfTime: LinkedEntity) => {
      const params: GetPeriodOfTimeParams = {
        singleOptionOnly: true,
        instanceId: periodOfTime.instanceId as string,
        metaId: periodOfTime.metaId as string,
      };
      this.apiService.endpoints.PeriodOfTime.get.call(params).then((items: Array<PeriodOfTime>) => {
        this.temporalExtents.push(items[0]);
        this.startDate = moment(items[0].startDate);
        this.endDate = moment(items[0].endDate);
        this.form = new FormGroup({
          coverage: this.createCoverageArray(items),
        });
        this.trackFormChanges();
        this.form.addValidators(this.dateComparisonArr());
      });
    });
  }

  public handleSave(index?: number) {
    /**
     * If the `temporalExtent` property of the `dataProduct` OR 'webservice' object is empty,
     * it means that there are no existing temporal extents associated with the data product and POST fn is called.
     */
    if (this.temporalLinkedEntities.length === 0) {
      this.loadingService.setShowSpinner(true);
      const newPeriodOfTime: PeriodOfTime = {
        startDate: this.startDate ? moment(this.startDate).toISOString() : '',
        endDate: this.endDate ? moment(this.endDate).toISOString() : '',
      };
      this.apiService.endpoints.PeriodOfTime.create
        .call(newPeriodOfTime)
        .then((temporalCoverage) => {
          if (this.dataProdAct) {
            const updatingObject = this.entityExecutionService.getActiveDataProductValue() || {};
            this.dataproductService.updateDataProductRecord(updatingObject, { temporalExtent: [temporalCoverage] });
            this.entityExecutionService.handleDataProductSave();
          } else {
            const activeWebService = this.entityExecutionService.getActiveWebServiceValue();
            activeWebService?.temporalExtent?.push(temporalCoverage);
            this.entityExecutionService.setActiveWebService(
              this.entityExecutionService.convertToWebService(activeWebService!),
            );
            this.entityExecutionService.handleWebserviceSave();
          }
          this.form.markAsPristine();
        })
        .finally(() => this.loadingService.setShowSpinner(false));
      /**
       * If the `temporalExtent` property of the `dataProduct` object has a value,
       * the relevant temporal extent is updated and PUT fn is called.
       */
    } else {
      const extentToUpdate = this.temporalExtents[index!];
      console.debug('extentToUpdate', extentToUpdate);
      extentToUpdate.startDate = this.startDate ? moment(this.startDate).toISOString() : '';
      extentToUpdate.endDate = this.endDate ? moment(this.endDate).toISOString() : '';

      this.spatialTemporalEntityExecutionService.handleTemporalSave(extentToUpdate);
      this.apiService.endpoints.PeriodOfTime.update.call(extentToUpdate);
    }
  }

  private trackFormChanges(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((changes) => {
      this.startDate = changes.coverage[0].startDate;
      this.endDate = changes.coverage[0].endDate;
    });
  }

  private createCoverageArray(temporalExtent?: PeriodOfTime[] | undefined): UntypedFormArray {
    const arr = new UntypedFormArray([]);
    if (temporalExtent) {
      temporalExtent?.forEach((item) => {
        arr.push(
          new FormGroup({
            startDate: new FormControl(item?.startDate, [Validators.required]),
            endDate: new FormControl(item?.endDate),
          }),
        );
      });
    } else {
      arr.push(
        new FormGroup({
          startDate: new FormControl('', [Validators.required]),
          endDate: new FormControl('', [Validators.max(moment(this.startDate).unix())]),
        }),
      );
    }
    return arr;
  }
}
