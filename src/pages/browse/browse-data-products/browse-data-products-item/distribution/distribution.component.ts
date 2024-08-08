import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { DataProduct, Distribution, LinkedEntity } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { Status } from 'src/utility/enums/status.enum';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrl: './distribution.component.scss',
})
export class DistributionComponent implements OnInit {
  @Input() distribution!: LinkedEntity[] | undefined;

  @Input() dataProduct!: DataProduct | undefined;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private dialogService: DialogService) {}

  public form!: FormGroup;

  public distributionDetails: Distribution[] = [];

  public dataAccessTypes: Record<string, unknown>[] = [
    {
      value: 'download',
      label: 'Downloadable File (URL)',
    },
    {
      value: 'webservice',
      label: 'Web service',
    },
  ];

  public selectedDataAccessType = this.dataAccessTypes[0]['value'];

  public floatLabelControl = new UntypedFormControl('auto');

  public entityEnum = Entity;

  public disabled = false;

  private initForm(): void {
    this.form = this.formBuilder.group({
      distributions: new FormArray(
        this.distributionDetails.map((distribution: Distribution) => {
          return new FormGroup({
            title: new FormControl(distribution?.title, [Validators.required]),
            description: new FormControl(distribution?.description),
            licence: new FormControl(distribution?.licence),
            dataAccess: new FormControl(this.checkAccess(distribution)),
          });
        }),
      ),
    });
    if (this.dataProduct?.status === Status.PUBLISHED || this.dataProduct?.status === Status.ARCHIVED) {
      this.form.disable();
      this.disabled = true;
    }
  }

  private checkAccess(distribution: Distribution): string {
    if (distribution.accessService?.instanceId !== undefined) {
      return 'webservice';
    }
    return 'download';
  }

  private getDistributionDetails(): void {
    const requests: Promise<Distribution[]>[] = [];
    this.distribution?.forEach((item: LinkedEntity) => {
      requests.push(
        this.apiService.endpoints[Entity.DISTRIBUTION].get.call(
          {
            metaId: item.metaId as string,
            instanceId: item.instanceId as string,
          },
          false,
        ),
      );
    });
    Promise.all(requests).then((value: Distribution[][]) => {
      const flattened = value.flat();
      this.distributionDetails = flattened;
      this.initForm();
    });
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  public ngOnInit(): void {
    this.getDistributionDetails();
  }

  public handleSave(): void {
    // this.dialogService
    //   .handleUpdateChangeComment(this.distribution?.changeComment ? this.distribution?.changeComment : '')
    //   .then((data: DialogData) => {
    //     if (data.dataOut != null) {
    //       const changeComment = data.dataOut;
    //       const activeDistribution = this.entityExecutionService.getActiveDistributionValue();
    //       if (null != activeDistribution) {
    //         activeDistribution.changeComment = changeComment;
    //         this.entityExecutionService.setActiveDistribution(activeDistribution);
    //         this.entityExecutionService.handleDistributionSave();
    //       }
    //     }
    //   });
    // this.actionsService.showSaveDistributionMessage(false);
  }

  public handleDelete(instanceId: string | undefined): void {
    if (instanceId !== undefined) {
      this.dialogService.handleDelete(instanceId, EntityEndpointValue.DISTRIBUTION, false);
    }
  }
}
