import { State } from 'src/utility/enums/state.enum';
import { Documentation } from '../types/documentation.type';
import { Provider } from '../types/provider.type';
import { SpatialExtent } from '../types/spatialExtent.type';
import { TemporalExtent } from '../types/temporalExtent.type';
import { ContactPoint } from './contactPoint.model';
import { Distribution } from './distribution.model';
import { EntityDetail } from '../types/entityDetail.type';

export class WebService {
  constructor(
    public uid: string,
    public aaaiTypes?: string,
    public category?: Array<string>,
    public changeComment?: string,
    public changeTimestamp?: Date,
    public contactPoint?: Array<ContactPoint>,
    public dateModified?: Date,
    public datePublished?: Date,
    public description?: string,
    public distribution?: Array<Distribution>,
    public documentation?: Array<Documentation>,
    public editorId?: string,
    public entryPoint?: string,
    public fileProvenance?: string,
    public identifier?: Array<string>,
    public instanceChangedId?: string,
    public instanceId?: string,
    public keywords?: string,
    public license?: string,
    public metaId?: string,
    public name?: string,
    public operation?: string,
    public provider?: Provider,
    public schemaIdentifier?: string,
    public spatialExtent?: Array<SpatialExtent>,
    public state?: State,
    public supportedOperation?: Array<EntityDetail>,
    public temporalExtent?: Array<TemporalExtent>,
    public toBeDelete?: string,
    public version?: string,
  ) {}
}
