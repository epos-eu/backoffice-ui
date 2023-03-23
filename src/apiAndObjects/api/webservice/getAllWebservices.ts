import { HttpHeaders } from '@angular/common/http';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/webserviceDetailDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetAllWebservices extends CacheableEndpoint<
  Array<WebserviceDetailDataSource>,
  GetAllWebservicesParams,
  WebserviceDetailDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllWebservicesParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetAllWebservicesParams): Promise<WebserviceDetailDataSource[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };
    const callResponsePromise = this.apiCaller.doCall(
      ['webservice/all'],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(WebserviceDetailDataSource, callResponsePromise);
  }

  protected callMock(): Promise<WebserviceDetailDataSource[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllWebservicesParams {}
