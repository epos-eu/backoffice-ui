import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { FacilitiesDataSource } from 'src/apiAndObjects/objects/facilitiesDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';

export class GetFacilities extends CacheableEndpoint<
  Array<FacilitiesDataSource>,
  GetFacilityDataSourcesParams,
  FacilitiesDataSource
> {
  protected getCacheKey(params: GetFacilityDataSourcesParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetFacilityDataSourcesParams): Promise<Array<FacilitiesDataSource>> {
    const callResponsePromise = this.apiCaller
      .doCall('organization', RequestMethod.GET)
      .then((data: unknown) => this.processResponseData(data, params));
    console.debug(callResponsePromise);
    return this.buildObjectsFromResponse(FacilitiesDataSource, callResponsePromise);
  }

  protected callMock(): Promise<FacilitiesDataSource[]> {
    const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      FacilitiesDataSource,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(lastValueFrom(httpClient.get('/assets/data/organization.json')));
        }, 100);
      }),
    );
  }

  private processResponseData(
    data: Array<Record<string, unknown>> | unknown,
    params: GetFacilityDataSourcesParams,
  ): Array<Record<string, unknown>> {
    if (Array.isArray(data)) {
      data.forEach((item: Record<string, unknown>, index: number) => (item['id'] = String(index).valueOf()));
      return params.singleOptionOnly === true ? data.slice(0, 1) : data;
    }
    return [{}];
  }
}

export interface GetFacilityDataSourcesParams {
  singleOptionOnly?: boolean;
  dataSource: FacilitiesDataSource;
}
