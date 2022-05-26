import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { SoftwareDataSource } from 'src/apiAndObjects/objects/softwareDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';

export class GetSoftware extends CacheableEndpoint<
  Array<SoftwareDataSource>,
  GetSoftwareDataSourcesParams,
  SoftwareDataSource
> {
  protected getCacheKey(params: GetSoftwareDataSourcesParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetSoftwareDataSourcesParams): Promise<SoftwareDataSource[]> {
    const callResponsePromise = this.apiCaller
      .doCall('software', RequestMethod.GET)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(SoftwareDataSource, callResponsePromise);
  }

  protected callMock(): Promise<SoftwareDataSource[]> {
    const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      SoftwareDataSource,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(lastValueFrom(httpClient.get('/assets/data/software.json')));
        }, 100);
      }),
    );
  }

  private processResponseData(
    data: Array<Record<string, unknown>> | unknown,
    params: GetSoftwareDataSourcesParams,
  ): Array<Record<string, unknown>> {
    if (Array.isArray(data)) {
      data.forEach((item: Record<string, unknown>, index: number) => (item['id'] = String(index).valueOf()));
      return params.singleOptionOnly === true ? data.slice(0, 1) : data;
    }
    return [{}];
  }
}

export interface GetSoftwareDataSourcesParams {
  singleOptionOnly?: boolean;
  dataSource: SoftwareDataSource;
}
