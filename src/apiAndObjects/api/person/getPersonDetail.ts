import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersonDataSource } from 'src/apiAndObjects/objects/data-source/personDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetPersonDetail extends CacheableEndpoint<
  Array<PersonDataSource>,
  GetPersonDetailsParams,
  PersonDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetPersonDetailsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetPersonDetailsParams): Promise<PersonDataSource[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller
      .doCall(`person/${params?.instanceId}`, RequestMethod.GET, undefined, undefined, headers)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(PersonDataSource, callResponsePromise);
  }

  private processResponseData(data: Array<Record<string, unknown>> | unknown, params: GetPersonDetailsParams) {
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
  protected override callMock(params?: GetPersonDetailsParams | undefined): Promise<PersonDataSource[]> {
    throw new Error('Method not implemented.');
  }
}

export interface GetPersonDetailsParams {
  singleOptionOnly?: boolean;
  instanceId: string;
}
