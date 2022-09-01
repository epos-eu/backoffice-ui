import { State } from 'src/utility/enums/state.enum';
import { Documentation } from '../types/documentation.type';
import { Provider } from '../types/provider.type';
import { SpatialExtent } from '../types/spatialExtent.type';
import { SupportedOperation } from '../types/supportedOperation.type';
import { TemporalExtent } from '../types/temporalExtent.type';
import { ContactPoint } from './contactPoint.model';

export class WebService {
  constructor(
    public title: string,
    public instanceId: string,
    public changeTimestamp: string,
    public state: State,
    public toBeDelete: string, // should be converted to boolean.
    public uid: string,
    public fileProvenance: string,
    public category: string[],
    public contactPoint: Array<ContactPoint>,
    public dateModified: string,
    public datePublished: string,
    public description: string,
    public documentation: Documentation[],
    public entryPoint: string,
    public keywords: string,
    public license: string,
    public provider: Provider,
    public spatialExtent: Array<SpatialExtent>,
    public supportedOperation: Array<SupportedOperation>,
    public temporalExtent: Array<TemporalExtent>,
    public name?: string,
  ) {}
}
