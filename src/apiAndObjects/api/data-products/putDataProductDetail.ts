import { HttpHeaders } from '@angular/common/http';
import { DataProductDataSource } from 'src/apiAndObjects/objects/dataProductDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { State } from 'src/utility/enums/state.enum';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { Identifier } from 'src/apiAndObjects/objects/types/identifier.type';
import { TemporalExtent } from 'src/apiAndObjects/objects/types/temporalExtent.type';

export class PutDataProductDetail extends CacheableEndpoint<
  DataProductDataSource,
  SaveDataProductBody,
  DataProductDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: SaveDataProductBody): string {
    return JSON.stringify(body);
  }

  protected callLive(body: SaveDataProductBody): Promise<DataProductDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['dataproduct'], RequestMethod.PUT, undefined, body, headers);

    return this.buildObjectFromResponse(DataProductDataSource, callResponsePromise).then(
      (response: DataProductDataSource) => response,
    );
  }

  protected callMock(): Promise<DataProductDataSource> {
    throw new Error('Method not implemented.');
  }
}

export interface SaveDataProductBody {
  instanceId?: string;
  uid: string;
  title: string;
  description: string;
  changeTimestamp: Date;
  state?: State;
  keywords: string;
  modified: string;
  versionInfo: string;
  changeComment: string;
  contactPoint: Array<ContactPoint>;
  distribution: Array<Distribution>;
  identifier: Array<Identifier>;
  issued: Date;
  temporalExtent: Array<TemporalExtent>;
}
