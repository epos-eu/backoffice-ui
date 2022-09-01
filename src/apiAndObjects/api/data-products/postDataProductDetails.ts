import { HttpHeaders } from '@angular/common/http';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { Operation } from 'src/apiAndObjects/objects/entities/operation.model';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { PostDataProductDataSource } from 'src/apiAndObjects/objects/postDataProductDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

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
        .set('Authorization', accessToken ? accessToken : '')
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
  comment: string;
  dataProduct: DataProduct;
  distributions: Array<Distribution>;
  webServices: Array<WebService>;
  operations: Array<Operation>;
  contactPoints: Array<ContactPoint>;
}
