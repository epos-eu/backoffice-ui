import { HttpHeaders } from '@angular/common/http';
import { ApiCaller } from 'src/apiAndObjects/_lib_code/api/apiCaller';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class DeleteEntity {
  private persistorService: PersistorService = new PersistorService();
  public entity: string;
  protected apiCaller!: ApiCaller;

  constructor(entity: string) {
    this.entity = entity;
  }

  public callLive(instanceId: string): Promise<string> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(
      [this.entity, instanceId],
      RequestMethod.DELETE,
      undefined,
      undefined,
      headers,
    );
    return callResponsePromise as Promise<string>;
  }
}
