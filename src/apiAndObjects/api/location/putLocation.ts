import { HttpHeaders } from '@angular/common/http';
import { Location } from 'generated/backofficeSchemas';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { LocationDataSource } from 'src/apiAndObjects/objects/data-source/locationDetailDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class PutLocation extends CacheableEndpoint<LocationDataSource, Location, LocationDataSource> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: Location): string {
    return JSON.stringify(body);
  }

  protected callLive(body: Location): Promise<LocationDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['location'], RequestMethod.PUT, undefined, body, headers);

    return this.buildObjectFromResponse(LocationDataSource, callResponsePromise).then(
      (response: LocationDataSource) => response,
    );
  }

  protected callMock(): Promise<LocationDataSource> {
    throw new Error('Method not implemented.');
  }
}
