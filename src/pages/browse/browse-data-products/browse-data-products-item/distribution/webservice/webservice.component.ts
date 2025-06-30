/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { DataProduct, Distribution, LinkedEntity, Organization, WebService } from 'generated/backofficeSchemas';
import { debounceTime } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { WithSubscription } from 'src/helpers/subscription';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { HelpersService } from 'src/services/helpers.service';
import { LoadingService } from 'src/services/loading.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { Status } from 'src/utility/enums/status.enum';

@Component({
  selector: 'app-distribution-webservice',
  templateUrl: './webservice.component.html',
  styleUrl: './webservice.component.scss',
})
export class DistributionWebserviceComponent extends WithSubscription implements OnInit {
  @Input() accessService!: Distribution['accessService'];
  @Input() supportedOperations: WebService['supportedOperation'];
  @Input() distributionIndex!: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly helpersService: HelpersService,
    private readonly apiService: ApiService,
    private readonly entityExecutionService: EntityExecutionService,
    private readonly loadingService: LoadingService,
  ) {
    super();
  }

  public form!: FormGroup;

  public webservice!: WebService | null;

  public floatLabelControl = new UntypedFormControl('auto');

  public serviceProviders: Array<Organization> = [];

  public serviceProvidersLoading = false;

  public selectedServiceProvider: Organization | undefined;

  public dataProduct!: DataProduct | null;

  public disabled = true;

  private initData(details: LinkedEntity): void {
    this.loadingService.setShowSpinner(true);
    this.apiService.endpoints[Entity.WEBSERVICE].get
      .call(
        {
          metaId: details.metaId as string,
          instanceId: details.instanceId as string,
        },
        false,
      )
      .then((data: Array<WebService>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.webservice = data.shift() as WebService;

          if (this.webservice) {
            this.entityExecutionService.setActiveWebService(
              this.entityExecutionService.convertToWebService(this.webservice),
            );
            this.handleServiceProviders(this.webservice);
            this.initForm();
            if (this.dataProduct?.status === Status.PUBLISHED || this.dataProduct?.status === Status.ARCHIVED) {
              this.form.disable();
              this.disabled = true;
            } else {
              this.disabled = false;
            }
          }
        }
      })
      .catch(() => {
        this.webservice = {};
      })
      .finally(() => this.loadingService.setShowSpinner(false));
  }

  private initSubscriptions(): void {
    this.subscribe(this.entityExecutionService.dataProductObs, (dataProduct: DataProduct | null) => {
      this.dataProduct = dataProduct;
    });
  }

  private trackFormData(): void {
    if (this.dataProduct) {
      const updatingObject = this.entityExecutionService.getActiveWebServiceValue();
      this.form.valueChanges.pipe(debounceTime(500)).subscribe((changes) => {
        if (null != updatingObject) {
          updatingObject.name = changes.name;
          updatingObject.description = changes.description;
          this.entityExecutionService.setActiveWebService(updatingObject);
        }
      });
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(this.webservice?.name),
      description: new FormControl(this.webservice?.description),
      documentation: new FormControl(this.webservice?.documentation, [
        Validators.required,
        (control: AbstractControl): { [key: string]: any } | null => {
          if (this.helpersService.isValidHttpUrl(control.value)) {
            return null;
          } else {
            control.markAsTouched();
            return { 'error-class': control.value };
          }
        },
      ]),
    });
    this.trackFormData();
  }

  public ngOnInit(): void {
    this.initSubscriptions();
    this.initData({
      instanceId: this.accessService![0].instanceId,
      metaId: this.accessService![0].metaId,
    });
  }

  public compareWithFn(optionOne: any, optionTwo: any): boolean {
    if (optionOne && optionTwo) {
      if (optionOne.metaId === optionTwo.metaId) {
        return true;
      }
      return false;
    }
    return false;
  }

  public handleUpdateServicePoint(): void {
    const webservice = this.entityExecutionService.getActiveWebServiceValue();
    if (webservice != null && this.selectedServiceProvider != null) {
      const serviceProviderEntityDetail: LinkedEntity = {
        entityType: Entity.ORGANIZATION,
        instanceId: this.selectedServiceProvider.instanceId,
        uid: this.selectedServiceProvider.uid,
        metaId: this.selectedServiceProvider.metaId,
      };
      webservice.provider = serviceProviderEntityDetail;
      this.entityExecutionService.setActiveWebService(webservice);
    }
  }

  private handleServiceProviders(webservice: WebService): void {
    if (this.serviceProviders.length === 0) {
      this.serviceProvidersLoading = true;
      this.apiService.endpoints.Organization.getAll.call().then((response: Organization[]) => {
        if (null != webservice.provider) {
          this.selectedServiceProvider = response.find((value: Organization) => value.uid === webservice.provider!.uid);
        }
        this.serviceProviders = response;
        this.serviceProvidersLoading = false;
      });
    }
  }
}
