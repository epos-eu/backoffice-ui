import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ServiceDataSource } from 'src/apiAndObjects/objects/serviceDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';

export class GetServices extends CacheableEndpoint<
  Array<ServiceDataSource>,
  GetServiceDataSourcesParams,
  ServiceDataSource
> {
  protected getCacheKey(params: GetServiceDataSourcesParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetServiceDataSourcesParams): Promise<ServiceDataSource[]> {
    const callResponsePromise = this.apiCaller
      .doCall('service', RequestMethod.GET)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(ServiceDataSource, callResponsePromise);
  }

  protected callMock(): Promise<ServiceDataSource[]> {
    const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      ServiceDataSource,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(lastValueFrom(httpClient.get('/testpath/assets/data/software.json')));
        }, 100);
      }),
    );
  }

  private processResponseData(
    data: Array<Record<string, unknown>> | unknown,
    params: GetServiceDataSourcesParams,
  ): Array<Record<string, unknown>> {
    if (Array.isArray(data)) {
      data.forEach((item: Record<string, unknown>, index: number) => (item['id'] = String(index).valueOf()));
      return params.singleOptionOnly === true ? data.slice(0, 1) : data;
    }
    return [{}];
  }
}

export interface GetServiceDataSourcesParams {
  singleOptionOnly?: boolean;
  dataSource: ServiceDataSource;
}
