import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataProduct, LinkedEntity, Organization } from 'generated/backofficeSchemas';
import { map } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { Status } from 'src/utility/enums/status.enum';

@Component({
  selector: 'app-data-providers',
  templateUrl: './data-providers.component.html',
  styleUrl: './data-providers.component.scss',
})
export class DataProvidersComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private entityExecutionService: EntityExecutionService,
    private snackbarService: SnackbarService,
  ) {}

  @Input() dataProduct!: DataProduct;

  public form!: FormGroup;

  public selectedDataProviders: Array<Organization> = [];

  public stateEnum = Status;

  public dataProviders: Array<Organization> = [];

  public loading = false;

  public disabled = false;

  public ngOnInit(): void {
    this.initData();
    this.initForm();
    this.trackFormChanges();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      dataProviders: new FormControl(),
    });
    if (this.dataProduct?.status === Status.PUBLISHED || this.dataProduct?.status === Status.ARCHIVED) {
      this.form.disable();
      this.disabled = true;
    }
  }

  private trackFormChanges(): void {
    this.form.valueChanges
      .pipe(
        map((changes) => {
          const providers = changes['dataProviders'];
          return providers.map((provider: Organization) => ({
            uid: provider.uid,
            metaId: provider.metaId,
            instanceId: provider.instanceId,
            entityType: Entity.ORGANIZATION,
          }));
        }),
      )
      .subscribe((dataProviders: Organization[]) => {
        dataProviders.forEach((publisher: LinkedEntity, index: number) => {
          if (Array.isArray(this.dataProduct?.publisher) && this.dataProduct?.publisher[index] != null) {
            this.dataProduct.publisher[index] = publisher;
          }
        });
      });
  }

  private initData(): void {
    if (this.dataProviders.length === 0) {
      this.loading = true;
      this.apiService.endpoints.Organization.getAll.call().then((response: Organization[]) => {
        this.dataProviders = response;
        this.loading = false;
        this.selectedDataProviders = response.filter((provider: Organization) => {
          return this.dataProduct?.publisher?.some((value: LinkedEntity) => {
            return provider.uid === value.uid;
          });
        });
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public compareWithFn(optionOne: any, optionTwo: any): boolean {
    if (optionOne.metaId === optionTwo.metaId) {
      return true;
    }
    return false;
  }

  public getDataProviderName(uid: string): string {
    const provider = this.dataProviders.find((provider) => provider.uid === uid);
    if (Array.isArray(provider?.legalName) && provider.legalName.length > 0) {
      return provider.legalName.shift() as string;
    }
    return '-';
  }

  public handleUpdateServicePoint(): void {
    const activeDataProduct = this.entityExecutionService.getActiveDataProductValue();
    activeDataProduct!.publisher = [];
    if (activeDataProduct != null && this.selectedDataProviders != null) {
      this.selectedDataProviders.forEach((org: Organization) => {
        const dataProviderEntityDetail: LinkedEntity = {
          entityType: 'ORGANIZATION',
          instanceId: org.instanceId,
          uid: org.uid,
          metaId: org.metaId,
        };
        activeDataProduct.publisher?.push(dataProviderEntityDetail);
        this.entityExecutionService.setActiveDataProduct(activeDataProduct);
        this.snackbarService.openSnackbar(`Please save.`, 'close', SnackbarType.WARNING, 3000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-warning',
        ]);
      });
    }
  }
}
