import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { State } from 'src/utility/enums/state.enum';
import { Group } from 'src/apiAndObjects/objects/entities/group.model';
import { CreateUpdateDistributionDataSource } from 'src/apiAndObjects/objects/createUpdateDistributionDataSource';
import { TemporalExtent } from 'src/apiAndObjects/objects/types/temporalExtent.type';
import { SpatialBounds } from 'src/apiAndObjects/objects/types/spatialBounds.type';

export class CreateDistributionDetail extends CacheableEndpoint<
  CreateUpdateDistributionDataSource,
  SaveDistributionBody,
  CreateUpdateDistributionDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: SaveDistributionBody): string {
    return JSON.stringify(body);
  }

  protected callLive(body: SaveDistributionBody): Promise<CreateUpdateDistributionDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['distribution'], RequestMethod.POST, undefined, body, headers);

    return this.buildObjectFromResponse(CreateUpdateDistributionDataSource, callResponsePromise).then(
      (response: CreateUpdateDistributionDataSource) => response,
    );
  }

  protected callMock(): Promise<CreateUpdateDistributionDataSource> {
    throw new Error('Method not implemented.');
  }
}

export interface SaveDistributionBody {
  accessService?: AccessService;
  accessURL?: Array<string>;
  availableFormats?: Array<AvailableFormat>;
  changeComment?: string;
  changeTimestamp?: Date | undefined;
  conformsTo?: string;
  dataPolicy?: string;
  dataProduct?: Array<DataProduct>;
  dataProvider?: Array<string>;
  description?: Array<string>;
  distributionid?: string;
  doi?: Array<string>;
  downloadURL?: Array<string>;
  editorId?: string;
  endpoint?: string;
  fileProvenance?: string;
  format?: string;
  frequencyUpdate?: string;
  groups?: Array<Group>;
  hasQualityAnnotation?: string;
  href?: string;
  id?: string;
  instanceChangedId?: string;
  instanceId?: string;
  internalID?: Array<string>;
  issued?: Date | undefined;
  keywords?: Array<string>;
  licence?: string;
  license?: string;
  metaId?: string;
  modified?: string;
  operation?: string;
  operationid?: string;
  parameters?: Array<BackofficeParameter>;
  productid?: string;
  scienceDomain?: Array<string>;
  serviceDescription?: string;
  serviceDocumentation?: string;
  serviceEndpoint?: string;
  serviceName?: string;
  serviceProvider?: string;
  serviceSpatial?: SpatialBounds;
  serviceTemporalCoverage?: TemporalExtent;
  serviceType?: Array<string>;
  spatial?: SpatialBounds;
  state?: State;
  temporalCoverage?: TemporalExtent;
  title?: Array<string>;
  toBeDelete?: string;
  type?: string;
  uid: string;
  version?: string;
}

type AccessService = {
  entityType: string;
  instanceId: string;
  metaId: string;
  uid: string;
};

type DataProduct = {
  entityType: string;
  instanceId: string;
  metaId: string;
  uid: string;
};

type AvailableFormat = {
  format: string;
  href: string;
  label: string;
  type: string;
};

type BackofficeParameter = {
  defaultValue: string;
  enumValue: Array<string>;
  label: string;
  maxValue: string;
  minValue: string;
  name: string;
  null: boolean;
  property: string;
  required: boolean;
  type: string;
  value: string;
  valuePattern: string;
  version: string;
};
