import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Identifier as IdentifierType } from 'generated/backofficeSchemas';
import { IdentifierDataSource as IdentifierDataModel } from 'src/apiAndObjects/objects/data-source/identifierDetailDataSource';

export class GetIdentifier extends CacheableEndpoint<Array<IdentifierType>, GetIdentifierParams, IdentifierType> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetIdentifierParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetIdentifierParams): Promise<IdentifierType[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller
      .doCall(`identifier/${params.metaId}/${params.instanceId}`, RequestMethod.GET, undefined, undefined, headers)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(IdentifierDataModel, callResponsePromise);
  }

  protected callMock(): Promise<IdentifierType[]> {
    throw new Error('Method not implemented.');
  }

  private processResponseData(data: Array<Record<string, unknown>> | unknown, params: GetIdentifierParams) {
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

export interface GetIdentifierParams {
  singleOptionOnly?: boolean;
  metaId: string;
  instanceId: string;
}
