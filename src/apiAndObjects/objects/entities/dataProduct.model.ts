import { State } from 'src/utility/enums/state.enum';
import { Identifier } from '../types/identifier.type';
import { Publisher } from '../types/publisher.type';
import { SimpleDistributionType } from '../types/simpleDistribution.type';
import { SpatialExtent } from '../types/spatialExtent.type';
import { TemporalExtent } from '../types/temporalExtent.type';
import { ContactPoint } from './contactPoint.model';

export class DataProduct {
  constructor(
    public instanceId: string,
    public changeTimestamp: string,
    public editorId: string,
    public state: State,
    public toBeDelete: string, // should be converted to boolean.
    public uid: string,
    public fileProvenance: string,
    public accrualPeriodicity: string,
    public category: string[],
    public contactPoint: Array<ContactPoint>,
    public description: string[],
    public distribution: Array<SimpleDistributionType>,
    public hasPart: string[],
    public identifier: Identifier[],
    public isPartOf: string[],
    public issued: string,
    public keywords: string,
    public modified: string,
    public provenance: string[],
    public publisher: Array<Publisher>,
    public spatialExtent: Array<SpatialExtent>,
    public temporalExtent: Array<TemporalExtent>,
    public title: string[],
    public type: string,
    public versionInfo: string,
    public accessRight?: string,
    public created?: string,
  ) {}
}
