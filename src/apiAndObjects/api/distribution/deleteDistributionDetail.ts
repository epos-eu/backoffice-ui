import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { CreateUpdateDistributionDataSource } from 'src/apiAndObjects/objects/createUpdateDistributionDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class DeleteDistribution extends CacheableEndpoint<
  CreateUpdateDistributionDataSource,
  DeleteDistributionBody,
  CreateUpdateDistributionDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: DeleteDistributionBody): string {
    return JSON.stringify(params);
  }

  protected callLive(params: DeleteDistributionBody): Promise<CreateUpdateDistributionDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(
      ['distribution', params.instanceId],
      RequestMethod.DELETE,
      undefined,
      undefined,
      headers,
    );

    return this.buildObjectFromResponse(CreateUpdateDistributionDataSource, callResponsePromise).then(
      (response: CreateUpdateDistributionDataSource) => response,
    );
  }

  protected callMock(): Promise<CreateUpdateDistributionDataSource> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DeleteDistributionBody {
  instanceId: string;
}
