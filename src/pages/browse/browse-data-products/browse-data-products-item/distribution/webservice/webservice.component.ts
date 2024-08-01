/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { DataProduct, Distribution, LinkedEntity, Organization, WebService } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { WithSubscription } from 'src/helpers/subscription';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { HelpersService } from 'src/services/helpers.service';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-distribution-webservice',
  templateUrl: './webservice.component.html',
  styleUrl: './webservice.component.scss',
})
export class DistributionWebserviceComponent extends WithSubscription implements OnInit {
  @Input() accessService!: Distribution['accessService'];

  constructor(
    private formBuilder: FormBuilder,
    private helpersService: HelpersService,
    private apiService: ApiService,
    private entityExecutionService: EntityExecutionService,
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

  private initData(details: LinkedEntity): void {
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
            // this.handleServiceProviders(this.webservice);
          }
        }
      })
      .catch(() => {
        this.webservice = {};
      });
  }

  private initSubscriptions(): void {
    this.subscribe(this.entityExecutionService.dataProductObs, (dataProduct: DataProduct | null) => {
      this.dataProduct = dataProduct;
    });
  }

  public ngOnInit(): void {
    this.initSubscriptions();
    this.initData({
      instanceId: this.accessService?.instanceId,
      metaId: this.accessService?.metaId,
    });
    this.form = this.formBuilder.group({
      title: new FormControl(this.webservice?.name),
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
}
