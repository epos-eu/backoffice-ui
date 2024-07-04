import { Component, Input, OnInit } from '@angular/core';
import { DataProduct, LinkedEntity } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { OrganizationDataSource } from 'src/apiAndObjects/objects/data-source/organizationDataSource';
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

  public selectedDataProviders: Array<OrganizationDataSource> = [];

  public stateEnum = Status;

  public dataProviders: Array<OrganizationDataSource> = [];

  public dataProvidersLoading = false;

  public ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    if (this.dataProviders.length === 0) {
      this.dataProvidersLoading = true;
      this.apiService.endpoints.Organization.getAll.call().then((response: OrganizationDataSource[]) => {
        console.log(response);
        this.dataProviders = response;
        this.dataProvidersLoading = false;
        this.selectedDataProviders = this.dataProviders.filter((provider: OrganizationDataSource) => {
          return this.dataProduct?.publisher?.some((value: LinkedEntity) => {
            return provider.uid === value.uid;
          });
        });
      });
    }
  }

  public handleDataProviderChange(event: Array<OrganizationDataSource>): void {
    const mapped = event.map((item: OrganizationDataSource) => {
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
}
