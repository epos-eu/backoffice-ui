import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Group } from 'src/apiAndObjects/objects/entities/group.model';
import { State } from 'src/utility/enums/state.enum';
import { PostContactPointDataSource } from 'src/apiAndObjects/objects/postContactPointDataSource';

export class PostContactPointDetails extends CacheableEndpoint<
  PostContactPointDataSource,
  SaveContactPointBody,
  PostContactPointDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: SaveContactPointBody): string {
    return JSON.stringify(body);
  }

  protected callLive(body: SaveContactPointBody): Promise<PostContactPointDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['contactpoint'], RequestMethod.POST, undefined, body, headers);

    return this.buildObjectFromResponse(PostContactPointDataSource, callResponsePromise).then(
      (response: PostContactPointDataSource) => response,
    );
  }

  protected callMock(): Promise<PostContactPointDataSource> {
    throw new Error('Method not implemented.');
  }
}

export interface SaveContactPointBody {
  changeComment: string;
  changeTimestamp: moment.Moment | undefined | null;
  editorId: string;
  email: Array<string>;
  fileProvenance: string;
  groups: Array<Group>;
  instanceChangedId: string;
  instanceId: string;
  language: Array<string>;
  metaId: string;
  operation: string;
  organization: Organization;
  person: Person;
  role: string;
  state: State;
  telephone: Array<string>;
  toBeDelete: string;
  uid: string;
  version: string;
}

type Organization = {
  entityType: string;
  instanceId: string;
  metaId: string;
  uid: string;
};

type Person = {
  entityType: string;
  instanceId: string;
  metaId: string;
  uid: string;
};
