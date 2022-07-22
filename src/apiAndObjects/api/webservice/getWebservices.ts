import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { WebserviceDataSource } from 'src/apiAndObjects/objects/webserviceDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';

export class GetWebservices extends CacheableEndpoint<
  Array<WebserviceDataSource>,
  GetWebserviceDataSourcesParams,
  WebserviceDataSource
> {
  protected getCacheKey(params: GetWebserviceDataSourcesParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetWebserviceDataSourcesParams): Promise<WebserviceDataSource[]> {
    const callResponsePromise = this.apiCaller
      .doCall('webservice', RequestMethod.GET)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(WebserviceDataSource, callResponsePromise);
  }

  protected callMock(): Promise<WebserviceDataSource[]> {
    const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      WebserviceDataSource,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(lastValueFrom(httpClient.get('/testpath/assets/data/webservice.json')));
        }, 100);
      }),
    );
  }

  private processResponseData(
    data: Array<Record<string, unknown>> | unknown,
    params: GetWebserviceDataSourcesParams,
  ): Array<Record<string, unknown>> {
    if (Array.isArray(data)) {
      data.forEach((item: Record<string, unknown>, index: number) => (item['id'] = String(index).valueOf()));
      return params.singleOptionOnly === true ? data.slice(0, 1) : data;
    }
    return [{}];
  }
}

export interface GetWebserviceDataSourcesParams {
  singleOptionOnly?: boolean;
  dataSource: WebserviceDataSource;
}
