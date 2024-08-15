import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { DataProduct, Distribution, LinkedEntity } from 'generated/backofficeSchemas';
import { stringify } from 'querystring';
import { debounceTime } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { DialogData } from 'src/components/dialogs/baseDialogService.abstract';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { HelpersService } from 'src/services/helpers.service';
import { LoadingService } from 'src/services/loading.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogService: DialogService,
    private entityExecutionService: EntityExecutionService,
    private loadingService: LoadingService,
    private helpersService: HelpersService,
  ) {}

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
    this.trackFormData();
    if (this.dataProduct?.status === Status.PUBLISHED || this.dataProduct?.status === Status.ARCHIVED) {
      this.form.disable();
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  private checkAccess(distribution: Distribution): string {
    if (distribution.accessService?.instanceId !== undefined) {
      return 'webservice';
    }
    return 'download';
  }

  private getDistributionDetails(): void {
    this.loadingService.setShowSpinner(true);
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
      this.loadingService.setShowSpinner(false);
    });
  }

  private trackFormData(): void {
    const actvIndex = 0;
    if (this.dataProduct) {
      const updatingObject = this.distributionDetails[actvIndex];
      this.entityExecutionService.setActiveDistribution(updatingObject);
      this.form.valueChanges.pipe(debounceTime(500)).subscribe((changes) => {
        updatingObject.title = this.helpersService.formatArrayVal(changes.distributions[actvIndex].title);
        updatingObject.description = this.helpersService.formatArrayVal(changes.distributions[0].description);
        updatingObject.licence = changes.distributions[actvIndex].licence;
        this.entityExecutionService.setActiveDistribution(updatingObject);
      });
    }
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  public ngOnInit(): void {
    this.getDistributionDetails();
  }

  public handleSave(index: number): void {
    const changeComment = this.distributionDetails[index].changeComment
      ? this.distributionDetails[index].changeComment!
      : '';
    this.dialogService.handleUpdateChangeComment(changeComment).then((data: DialogData) => {
      if (data.dataOut != null) {
        const changeComment = data.dataOut;
        const activeDistribution = this.entityExecutionService.getActiveDistributionValue();
        if (null != activeDistribution) {
          activeDistribution.changeComment = changeComment;
          this.entityExecutionService.setActiveDistribution(activeDistribution);
          this.entityExecutionService.handleDistributionSave().then((success: boolean) => {
            if (success && activeDistribution.accessService) {
              this.entityExecutionService.handleWebserviceSave();
            }
          });
        }
      }
    });
  }

  public handleDelete(instanceId: string | undefined): void {
    if (instanceId !== undefined) {
      this.dialogService.handleDelete(instanceId, EntityEndpointValue.DISTRIBUTION, false);
    }
  }

  public handleAddDistribution(): void {
    this.apiService.endpoints[Entity.DISTRIBUTION].create.call().then((dist: DistributionDetailDataSource) => {
      this.distributionDetails.push(dist);
      this.initForm();

      const newDistributionEntity: LinkedEntity = {
        entityType: Entity.DISTRIBUTION,
        instanceId: dist.instanceId,
        metaId: dist.metaId,
        uid: dist.uid,
      };

      if (null != this.dataProduct) {
        this.dataProduct.distribution?.push(newDistributionEntity);
        this.entityExecutionService.setActiveDataProduct(
          this.entityExecutionService.convertToDataProduct(this.dataProduct),
        );
      }
      this.entityExecutionService.handleDataProductSave();
    });
  }

  public handleAddWebservice(index: number) {
    this.apiService.endpoints[Entity.WEBSERVICE].create.call().then((webservice: WebserviceDetailDataSource) => {
      const newWebserviceEntity: LinkedEntity = {
        entityType: Entity.WEBSERVICE,
        instanceId: webservice.instanceId,
        metaId: webservice.metaId,
        uid: webservice.uid,
      };

      this.distributionDetails[index].accessService = newWebserviceEntity;
      this.initForm();

      const activeDistribution = this.distributionDetails[index];
      if (null != activeDistribution) {
        this.entityExecutionService.setActiveDistribution(activeDistribution);
        this.entityExecutionService.handleDistributionSave();
      }
    });
  }

  public getDistributionTabTitle(distribution: Distribution): string {
    if (null != distribution.title && distribution.title.length > 0) {
      const title = distribution.title[0];
      const titleString = title.length > 70 ? `${title.substring(0, 70)}...` : title;
      return titleString;
    }
    return 'New Distribution';
  }
}
