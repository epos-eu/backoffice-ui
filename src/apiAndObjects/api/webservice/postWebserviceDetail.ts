import { HttpHeaders } from '@angular/common/http';
import { Provider } from '@angular/core';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { Documentation } from 'src/apiAndObjects/objects/types/documentation.type';
import { SpatialExtent } from 'src/apiAndObjects/objects/types/spatialExtent.type';
import { SupportedOperation } from 'src/apiAndObjects/objects/types/supportedOperation.type';
import { TemporalExtent } from 'src/apiAndObjects/objects/types/temporalExtent.type';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/webserviceDetailDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { State } from 'src/utility/enums/state.enum';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class PostWebserviceDetail extends CacheableEndpoint<
  WebserviceDetailDataSource,
  SaveWebserviceBody,
  WebserviceDetailDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: SaveWebserviceBody): string {
    return JSON.stringify(body);
  }

  protected callLive(body: SaveWebserviceBody): Promise<WebserviceDetailDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['webservice'], RequestMethod.POST, undefined, body, headers);

    return this.buildObjectFromResponse(WebserviceDetailDataSource, callResponsePromise).then(
      (response: WebserviceDetailDataSource) => response,
    );
  }

  protected callMock(): Promise<WebserviceDetailDataSource> {
    throw new Error('Method not implemented.');
  }
}

export interface SaveWebserviceBody {
  aaaiTypes?: string;
  category?: Array<string>;
  changeComment?: string;
  changeTimestamp?: Date;
  contactPoint?: Array<ContactPoint>;
  dateModified?: Date;
  datePublished?: Date;
  description?: string;
  distribution?: Array<Distribution>;
  documentation?: Array<Documentation>;
  editorId?: string;
  entryPoint?: string;
  fileProvenance?: string;
  identifier?: string;
  instanceChangedId?: string;
  instanceId?: string;
  keywords?: string;
  license?: string;
  metaId?: string;
  name?: string;
  operation?: string;
  provider?: Provider;
  schemaIdentifier?: string;
  spatialExtent?: Array<SpatialExtent>;
  state?: State;
  supportedOperation?: Array<SupportedOperation>;
  temporalExtent?: Array<TemporalExtent>;
  toBeDelete?: string;
  uid: string;
  version?: string;
}
