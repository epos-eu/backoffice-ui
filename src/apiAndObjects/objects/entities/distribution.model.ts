import { State } from 'src/utility/enums/state.enum';
import { SpatialBounds } from '../types/spatialBounds.type';
import { TemporalExtent } from '../types/temporalExtent.type';
import { Group } from './group.model';
export class Distribution {
  constructor(
    public uid: string,
    public accessService?: AccessService,
    public accessURL?: Array<string>,
    public availableFormats?: Array<AvailableFormat>,
    public changeComment?: string,
    public changeTimestamp?: Date | undefined,
    public conformsTo?: string,
    public contactPoint?: string,
    public dataPolicy?: string,
    public dataProduct?: Array<DataProduct>,
    public dataProvider?: Array<string>,
    public description?: Array<string>,
    public distributionid?: string,
    public distribution?: string,
    public doi?: Array<string>,
    public downloadURL?: Array<string>,
    public editorId?: string,
    public endpoint?: string,
    public fileProvenance?: string,
    public format?: string,
    public frequencyUpdate?: string,
    public groups?: Array<Group>,
    public hasQualityAnnotation?: string,
    public href?: string,
    public id?: string,
    public instanceChangedId?: string,
    public instanceId?: string,
    public internalID?: Array<string>,
    public issued?: Date | undefined,
    public keywords?: Array<string>,
    public licence?: string,
    public license?: string,
    public metaId?: string,
    public modified?: string,
    public operation?: string,
    public operationid?: string,
    public parameters?: Array<BackofficeParameter>,
    public productid?: string,
    public scienceDomain?: Array<string>,
    public serviceDescription?: string,
    public serviceDocumentation?: string,
    public serviceEndpoint?: string,
    public serviceName?: string,
    public serviceProvider?: string,
    public serviceSpatial?: SpatialBounds,
    public serviceTemporalCoverage?: TemporalExtent,
    public serviceType?: Array<string>,
    public spatialExtent?: SpatialBounds,
    public state?: State,
    public temporalCoverage?: TemporalExtent,
    public temporalExtent?: TemporalExtent,
    public title?: Array<string>,
    public toBeDelete?: string,
    public type?: string,
    public version?: string,
  ) {}
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
