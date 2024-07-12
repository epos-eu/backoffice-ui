import { Component, Input, OnInit } from '@angular/core';
import { DataProduct, LinkedEntity, Organization } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { Status } from 'src/utility/enums/status.enum';

@Component({
  selector: 'app-data-providers',
  templateUrl: './data-providers.component.html',
  styleUrl: './data-providers.component.scss',
})
export class DataProvidersComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  @Input() dataProduct!: DataProduct;

  public selectedDataProviders: Array<Organization> = [];

  public stateEnum = Status;

  public dataProviders: Array<Organization> = [];

  public dataProvidersLoading = false;

  public ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    if (this.dataProviders.length === 0) {
      this.dataProvidersLoading = true;
      this.apiService.endpoints.Organization.getAll.call().then((response: Organization[]) => {
        console.log(response);
        this.dataProviders = response;
        this.dataProvidersLoading = false;
        this.selectedDataProviders = this.dataProviders.filter((provider: Organization) => {
          return this.dataProduct?.publisher?.some((value: LinkedEntity) => {
            return provider.uid === value.uid;
          });
        });
      });
    }
  }

  public handleDataProviderChange(event: Array<Organization>): void {
    const mapped = event.map((item: Organization) => {
      return {
        uid: item.uid,
        metaId: item.metaId,
        instanceId: item.instanceId,
        entityType: Entity.ORGANIZATION,
      };
    });
    mapped.forEach((publisher: LinkedEntity, index: number) => {
      if (Array.isArray(this.dataProduct?.publisher) && this.dataProduct?.publisher[index] != null) {
        this.dataProduct.publisher[index] = publisher;
      }
    });
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
}
