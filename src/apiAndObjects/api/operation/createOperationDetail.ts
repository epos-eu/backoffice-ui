import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { State } from 'src/utility/enums/state.enum';
import { Group } from 'src/apiAndObjects/objects/entities/group.model';
import { Mapping } from 'src/apiAndObjects/objects/types/mapping.type';
import { CreateUpdateOperationDataSource } from 'src/apiAndObjects/objects/createUpdateOperationDataSource';

export class CreateOperationDetail extends CacheableEndpoint<
  CreateUpdateOperationDataSource,
  SaveOperationBody,
  CreateUpdateOperationDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: SaveOperationBody): string {
    return JSON.stringify(body);
  }

  protected callLive(body: SaveOperationBody): Promise<CreateUpdateOperationDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['operation'], RequestMethod.POST, undefined, body, headers);

    return this.buildObjectFromResponse(CreateUpdateOperationDataSource, callResponsePromise).then(
      (response: CreateUpdateOperationDataSource) => response,
    );
  }

  protected callMock(): Promise<CreateUpdateOperationDataSource> {
    throw new Error('Method not implemented.');
  }
}

export interface SaveOperationBody {
  changeComment: string;
  changeTimestamp: Date | undefined;
  editorId: string;
  email: Array<string>;
  fileProvenance: string;
  groups: Array<Group>;
  instanceChangedId: string;
  instanceId: string;
  mapping: Array<Mapping>;
  legalName: Array<string>;
  metaId: string;
  method: string;
  operation: string;
  returns: Array<string>;
  state: State;
  template: string;
  toBeDelete: string;
  uid: string;
  version: string;
  webservice: Array<Webservice>;
}

type Webservice = {
  entityType: string;
  instanceId: string;
  metaId: string;
  uid: string;
};
