import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { LocationDataSource } from 'src/apiAndObjects/objects/data-source/locationDetailDataSource';

export class GetAllLocations extends Endpoint<Array<LocationDataSource>, GetAllLocationParams, LocationDataSource> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllLocationParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<LocationDataSource[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(
      ['location/all'],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(LocationDataSource, callResponsePromise);
  }

  protected callMock(): Promise<LocationDataSource[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllLocationParams {}
