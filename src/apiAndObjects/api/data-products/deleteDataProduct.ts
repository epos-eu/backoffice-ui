import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { DataProductDataSource } from 'src/apiAndObjects/objects/dataProductDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class DeleteDataProduct extends CacheableEndpoint<
  DataProductDataSource,
  DeleteDataProductBody,
  DataProductDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: DeleteDataProductBody): string {
    return JSON.stringify(params);
  }

  protected callLive(params: DeleteDataProductBody): Promise<DataProductDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(
      ['dataproduct', params.instanceId],
      RequestMethod.DELETE,
      undefined,
      undefined,
      headers,
    );

    return this.buildObjectFromResponse(DataProductDataSource, callResponsePromise).then(
      (response: DataProductDataSource) => response,
    );
  }

  protected callMock(): Promise<DataProductDataSource> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DeleteDataProductBody {
  instanceId: string;
}
