import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ContactPointDataSource } from 'src/apiAndObjects/objects/contactPointDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetContactPointDetail extends CacheableEndpoint<
  Array<ContactPointDataSource>,
  GetContactPointDetailsParams,
  ContactPointDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetContactPointDetailsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetContactPointDetailsParams): Promise<ContactPointDataSource[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller
      .doCall(`contactpoint/${params?.instanceId}`, RequestMethod.GET, undefined, undefined, headers)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(ContactPointDataSource, callResponsePromise);
  }

  protected callMock(params?: GetContactPointDetailsParams | undefined): Promise<ContactPointDataSource[]> {
    const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      ContactPointDataSource,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(lastValueFrom(httpClient.get('/assets/data/contactPoint.json')));
        }, 100);
      }),
    );
  }

  private processResponseData(data: Array<Record<string, unknown>> | unknown, params: GetContactPointDetailsParams) {
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

export interface GetContactPointDetailsParams {
  singleOptionOnly?: boolean;
  instanceId: string;
}
