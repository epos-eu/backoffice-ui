import { State } from 'src/utility/enums/state.enum';
import { Identifier } from '../types/identifier.type';
import { Publisher } from '../types/publisher.type';
import { SimpleDistributionType } from '../types/simpleDistribution.type';
import { SpatialExtent } from '../types/spatialExtent.type';
import { TemporalExtent } from '../types/temporalExtent.type';
import { ContactPoint } from './contactPoint.model';

export class DataProduct {
  constructor(
    public instanceId: string, // include (hidden)
    public changeTimestamp: string, // include
    public editorId: string,
    public state: State, // include
    public toBeDelete: string, // should be converted to boolean.
    public uid: string, // include
    public fileProvenance: string,
    public accrualPeriodicity: string,
    public category: string[],
    public contactPoint: Array<ContactPoint>,
    public description: string[], // include
    public distribution: Array<SimpleDistributionType>,
    public hasPart: string[],
    public identifier: Identifier[], // include
    public isPartOf: string[],
    public issued: string, // include
    public keywords: string, // include
    public modified: string, // include
    public provenance: string[],
    public publisher: Array<Publisher>,
    public spatialExtent: Array<SpatialExtent>, // include
    public temporalExtent: Array<TemporalExtent>, // include
    public title: string[], // include
    public type: string,
    public versionInfo: string, // include
    public accessRight?: string,
    public created?: string, // include
  ) {}
}
