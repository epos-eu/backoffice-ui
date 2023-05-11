import { HttpHeaders } from '@angular/common/http';
import { DataProductDataSource } from 'src/apiAndObjects/objects/dataProductDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';

export class PostDataProductDetails extends CacheableEndpoint<
  DataProductDataSource,
  DataProduct,
  DataProductDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: DataProduct): string {
    return JSON.stringify(body);
  }

  protected callLive(body: DataProduct): Promise<DataProductDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['dataproduct'], RequestMethod.POST, undefined, body, headers);

    return this.buildObjectFromResponse(DataProductDataSource, callResponsePromise).then(
      (response: DataProductDataSource) => response,
    );
  }

  protected callMock(): Promise<DataProductDataSource> {
    throw new Error('Method not implemented.');
  }
}

// export interface SaveDataProductBody {
//   accessRight?: string;
//   accrualPeriodicity?: string;
//   category?: Array<string>;
//   changeComment?: string;
//   changeTimestamp?: Date;
//   contactPoint?: Array<ContactPoint>;
//   created?: Date;
//   dctIdentifier?: string;
//   description?: string;
//   distribution?: Array<Distribution>;
//   documentation?: string;
//   editorId?: string;
//   fileProvenance?: string;
//   groups?: Array<Group>;
//   hasPart?: Array<EntityDetail>;
//   hasQualityAnnotation?: string;
//   identifier?: Array<Identifier>;
//   instanceChangedId?: string;
//   instanceId?: string;
//   isPartOf?: Array<EntityDetail>;
//   issued?: Date;
//   keywords?: string;
//   metaId?: string;
//   modified?: string;
//   operation?: string;
//   provenance?: Array<string>;
//   publisher?: Array<EntityDetail>;
//   qualityAssurance?: string;
//   relation?: Array<EntityDetail>;
//   spatialExtent?: Array<SpatialExtent>;
//   state?: State;
//   temporalExtent?: Array<TemporalExtent>;
//   title?: string;
//   toBeDelete?: string;
//   type?: string;
//   uid: string;
//   version?: string;
//   versionInfo?: string;
// }
