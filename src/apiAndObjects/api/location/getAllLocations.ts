import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { Location as LocationType } from 'generated/backofficeSchemas';
import { LocationDataSource as LocationDataModel } from 'src/apiAndObjects/objects/data-source/locationDetailDataSource';

export class GetAllLocations extends Endpoint<Array<LocationType>, GetAllLocationParams, LocationType> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllLocationParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<LocationType[]> {
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
    return this.buildObjectsFromResponse(LocationDataModel, callResponsePromise);
  }

  protected callMock(): Promise<LocationType[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllLocationParams {}
