import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { DataProductsDataSource } from 'src/apiAndObjects/objects/dataProductsDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetDataProductDetail extends CacheableEndpoint<
  Array<DataProductsDataSource>,
  GetDataProductsDetailsParams,
  DataProductsDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetDataProductsDetailsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetDataProductsDetailsParams): Promise<DataProductsDataSource[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller
      .doCall(`dataproduct/${params.instanceId}`, RequestMethod.GET, undefined, undefined, headers)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(DataProductsDataSource, callResponsePromise);
  }

  protected callMock(params?: GetDataProductsDetailsParams | undefined): Promise<DataProductsDataSource[]> {
    const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      DataProductsDataSource,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(lastValueFrom(httpClient.get('/testpath/assets/data/dataProduct.json')));
        }, 100);
      }),
    );
  }

  private processResponseData(data: Array<Record<string, unknown>> | unknown, params: GetDataProductsDetailsParams) {
    if (Array.isArray(data)) {
      data.forEach((item: Record<string, unknown>, index: number) => (item['id'] = String(index).valueOf()));
      return params.singleOptionOnly === true ? data.slice(0, 1) : data;
    } else {
      const dataAsArr: Array<Record<string, unknown>> = [];
      dataAsArr.push(data as Record<string, unknown>);
      dataAsArr.forEach((item: Record<string, unknown>, index: number) => (item['id'] = String(index).valueOf()));
      return params.singleOptionOnly === true ? dataAsArr.slice(0, 1) : dataAsArr;
    }
  }
}

export interface GetDataProductsDetailsParams {
  singleOptionOnly?: boolean;
  instanceId: string;
}
