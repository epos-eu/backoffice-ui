import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';

export class PostWebserviceDetail extends Endpoint<WebserviceDetailDataSource, WebService, WebserviceDetailDataSource> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: WebService): string {
    return JSON.stringify(body);
  }

  protected callLive(body: WebService): Promise<WebserviceDetailDataSource> {
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
