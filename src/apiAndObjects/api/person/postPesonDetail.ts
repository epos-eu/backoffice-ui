import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { State } from 'src/utility/enums/state.enum';
import { Group } from 'src/apiAndObjects/objects/entities/group.model';
import { Address } from 'src/apiAndObjects/objects/types/address.type';
import { Identifier } from 'src/apiAndObjects/objects/types/identifier.type';
import { PostPersonDataSource } from 'src/apiAndObjects/objects/postPersonDataSource';

export class PostPersonDetail extends CacheableEndpoint<PostPersonDataSource, SavePersonBody, PostPersonDataSource> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: SavePersonBody): string {
    return JSON.stringify(body);
  }

  protected callLive(body: SavePersonBody): Promise<PostPersonDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['person'], RequestMethod.POST, undefined, body, headers);

    return this.buildObjectFromResponse(PostPersonDataSource, callResponsePromise).then(
      (response: PostPersonDataSource) => response,
    );
  }

  protected callMock(): Promise<PostPersonDataSource> {
    throw new Error('Method not implemented.');
  }
}

export interface SavePersonBody {
  acronym: string;
  address: Address;
  changeComment: string;
  changeTimestamp: Date | undefined;
  contactPoint: Array<ContactPoint>;
  editorId: string;
  email: Array<string>;
  fileProvenance: string;
  groups: Array<Group>;
  identifier: Array<Identifier>;
  instanceChangedId: string;
  instanceId: string;
  legalName: Array<string>;
  leiCode: string;
  logo: string;
  maturity: string;
  memberOf: Array<MemberOf>;
  metaId: string;
  operation: string;
  owns: Array<string>;
  state: State;
  telephone: Array<string>;
  toBeDelete: string;
  type: string;
  uid: string;
  url: string;
  version: string;
}

type MemberOf = {
  entityType: string;
  instanceId: string;
  metaId: string;
  uid: string;
};

type ContactPoint = {
  entityType: string;
  instanceId: string;
  metaId: string;
  uid: string;
};
