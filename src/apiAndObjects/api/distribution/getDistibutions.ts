import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { DistributionDataSource } from 'src/apiAndObjects/objects/distributionDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';

export class GetDistributions extends CacheableEndpoint<
  Array<DistributionDataSource>,
  GetDistributionDataSourcesParams,
  DistributionDataSource
> {
  protected getCacheKey(params: GetDistributionDataSourcesParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetDistributionDataSourcesParams): Promise<Array<DistributionDataSource>> {
    const callResponsePromise = this.apiCaller
      .doCall('distribution', RequestMethod.GET)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(DistributionDataSource, callResponsePromise);
  }

  protected callMock(): Promise<DistributionDataSource[]> {
    const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      DistributionDataSource,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(lastValueFrom(httpClient.get('/testpath/assets/data/organization.json')));
        }, 100);
      }),
    );
  }

  private processResponseData(
    data: Array<Record<string, unknown>> | unknown,
    params: GetDistributionDataSourcesParams,
  ): Array<Record<string, unknown>> {
    if (Array.isArray(data)) {
      data.forEach((item: Record<string, unknown>, index: number) => (item['id'] = String(index).valueOf()));
      return params.singleOptionOnly === true ? data.slice(0, 1) : data;
    }
    return [{}];
  }
}

export interface GetDistributionDataSourcesParams {
  singleOptionOnly?: boolean;
  dataSource: DistributionDataSource;
}
