import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { DataProductDataSource } from 'src/apiAndObjects/objects/dataProductDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';

export class GetDataProducts extends CacheableEndpoint<
  Array<DataProductDataSource>,
  GetDataProductSourcesParams,
  DataProductDataSource
> {
  protected getCacheKey(params: GetDataProductSourcesParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetDataProductSourcesParams): Promise<DataProductDataSource[]> {
    const callResponsePromise = this.apiCaller
      .doCall('dataProduct', RequestMethod.GET)
      .then((data: any) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(DataProductDataSource, callResponsePromise);
  }

  protected callMock(): Promise<DataProductDataSource[]> {
    const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      DataProductDataSource,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(lastValueFrom(httpClient.get('/assets/data/dataProduct.json')));
        }, 100);
      }),
    );
  }

  private processResponseData(
    data: Array<Record<string, unknown>>,
    params: GetDataProductSourcesParams,
  ): Array<Record<string, unknown>> {
    data.forEach((item: Record<string, unknown>, index: number) => (item['id'] = String(index).valueOf()));
    return params.singleOptionOnly === true ? data.slice(0, 1) : data;
  }
}

export interface GetDataProductSourcesParams {
  singleOptionOnly?: boolean;
  dataSource: DataProductDataSource;
}
