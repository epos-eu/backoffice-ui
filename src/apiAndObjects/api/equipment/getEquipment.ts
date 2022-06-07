import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { EquipmentDataSource } from 'src/apiAndObjects/objects/equipmentDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';

export class GetEquipments extends CacheableEndpoint<
  Array<EquipmentDataSource>,
  GetEquipmentDataSourcesParams,
  EquipmentDataSource
> {
  protected getCacheKey(params: GetEquipmentDataSourcesParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetEquipmentDataSourcesParams): Promise<Array<EquipmentDataSource>> {
    const callResponsePromise = this.apiCaller
      .doCall('organization', RequestMethod.GET)
      .then((data: unknown) => this.processResponseData(data, params));
    console.debug(callResponsePromise);
    return this.buildObjectsFromResponse(EquipmentDataSource, callResponsePromise);
  }

  protected callMock(): Promise<EquipmentDataSource[]> {
    const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      EquipmentDataSource,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(lastValueFrom(httpClient.get('/assets/data/organization.json')));
        }, 100);
      }),
    );
  }

  private processResponseData(
    data: Array<Record<string, unknown>> | unknown,
    params: GetEquipmentDataSourcesParams,
  ): Array<Record<string, unknown>> {
    if (Array.isArray(data)) {
      data.forEach((item: Record<string, unknown>, index: number) => (item['id'] = String(index).valueOf()));
      return params.singleOptionOnly === true ? data.slice(0, 1) : data;
    }
    return [{}];
  }
}

export interface GetEquipmentDataSourcesParams {
  singleOptionOnly?: boolean;
  dataSource: EquipmentDataSource;
}
