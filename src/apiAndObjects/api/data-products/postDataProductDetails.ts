import { HttpHeaders } from '@angular/common/http';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { PostDataProductDataSource } from 'src/apiAndObjects/objects/postDataProductDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Group } from 'src/apiAndObjects/objects/entities/group.model';
import { State } from 'src/utility/enums/state.enum';
import { TemporalExtent } from 'src/apiAndObjects/objects/types/temporalExtent.type';
import { SpatialExtent } from 'src/apiAndObjects/objects/types/spatialExtent.type';
import { Identifier } from 'src/apiAndObjects/objects/types/identifier.type';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';

export class PostDataProductDetails extends CacheableEndpoint<
  PostDataProductDataSource,
  SaveDataProductBody,
  PostDataProductDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: SaveDataProductBody): string {
    return JSON.stringify(body);
  }

  protected callLive(body: SaveDataProductBody): Promise<PostDataProductDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['dataproduct'], RequestMethod.POST, undefined, body, headers);

    return this.buildObjectFromResponse(PostDataProductDataSource, callResponsePromise).then(
      (response: PostDataProductDataSource) => response,
    );
  }

  protected callMock(): Promise<PostDataProductDataSource> {
    throw new Error('Method not implemented.');
  }
}

export interface SaveDataProductBody {
  accessRight?: string;
  accrualPeriodicity?: string;
  category?: Array<string>;
  changeComment: string;
  changeTimestamp: Date;
  contactPoint: Array<ContactPoint>;
  created?: Date;
  dctIdentifier?: string;
  description: Array<string>;
  distribution: Array<Distribution>;
  documentation?: string;
  editorId?: string;
  fileProvenance?: string;
  groups?: Array<Group>;
  hasPart?: Array<EntityDetail>;
  hasQualityAnnotation?: string;
  identifier: Array<Identifier>;
  instanceChangedId?: string;
  instanceId?: string;
  isPartOf?: Array<EntityDetail>;
  issued: Date;
  keywords: string;
  metaId?: string;
  modified: string;
  operation?: string;
  provenance?: Array<string>;
  publisher?: Array<EntityDetail>;
  qualityAssurance?: string;
  relation?: Array<EntityDetail>;
  spatialExtent?: Array<SpatialExtent>;
  state?: State;
  temporalExtent: Array<TemporalExtent>;
  title: Array<string>;
  toBeDelete?: string;
  type?: string;
  uid: string;
  version?: string;
  versionInfo: string;
}
