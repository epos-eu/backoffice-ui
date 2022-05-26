import { HttpClient } from '@angular/common/http';
import { OrganisationDataSource } from 'src/apiAndObjects/objects/organisationDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';

export class GetOrganisations extends CacheableEndpoint<
  Array<OrganisationDataSource>,
  GetOrganisationDataSourcesParams,
  OrganisationDataSource
> {
  protected getCacheKey(params: GetOrganisationDataSourcesParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetOrganisationDataSourcesParams): Promise<Array<OrganisationDataSource>> {
    const callResponsePromise = this.apiCaller
      .doCall('organization', RequestMethod.GET)
      .then((data: any) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(OrganisationDataSource, callResponsePromise);
  }

  protected callMock(): Promise<OrganisationDataSource[]> {
    const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      OrganisationDataSource,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(httpClient.get('/assets/data/organization.json').toPromise());
        }, 100);
      }),
    );
  }

  private processResponseData(
    data: Array<Record<string, unknown>>,
    params: GetOrganisationDataSourcesParams,
  ): Array<Record<string, unknown>> {
    data.forEach((item: Record<string, unknown>, index: number) => (item['id'] = String(index).valueOf()));
    return params.singleOptionOnly === true ? data.slice(0, 1) : data;
  }
}

export interface GetOrganisationDataSourcesParams {
  singleOptionOnly?: boolean;
  dataSource: OrganisationDataSource;
}
