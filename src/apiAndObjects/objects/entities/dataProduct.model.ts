import { State } from 'src/utility/enums/state.enum';
import { Identifier } from '../types/identifier.type';
import { SpatialExtent } from '../types/spatialExtent.type';
import { TemporalExtent } from '../types/temporalExtent.type';
import { ContactPoint } from './contactPoint.model';
import { Distribution } from './distribution.model';
import { EntityDetail } from '../types/entityDetail.type';
import { Group } from './group.model';

export class DataProduct {
  constructor(
    public changeComment: string,
    public changeTimestamp: moment.Moment | undefined,
    public contactPoint: Array<ContactPoint>,
    public description: Array<string>,
    public distribution: Array<Distribution>,
    public identifier: Array<Identifier>,
    public issued: moment.Moment | undefined | null,
    public keywords: string,
    public modified: string,
    public temporalExtent: Array<TemporalExtent>,
    public title: Array<string>,
    public uid: string,
    public versionInfo: string,
    public accessRight?: string,
    public accrualPeriodicity?: string,
    public category?: string[],
    public created?: moment.Moment | undefined,
    public dctIdentifier?: string,
    public documentation?: string,
    public editorId?: string,
    public fileProvenance?: string,
    public groups?: Array<Group>,
    public hasPart?: Array<EntityDetail>,
    public hasQualityAnnotation?: string,
    public instanceChangedId?: string,
    public instanceId?: string,
    public isPartOf?: Array<EntityDetail>,
    public metaId?: string,
    public operation?: string,
    public provenance?: Array<string>,
    public publisher?: Array<EntityDetail>,
    public qualityAssurance?: string,
    public relation?: Array<EntityDetail>,
    public spatialExtent?: Array<SpatialExtent>,
    public state?: State,
    public toBeDelete?: string,
    public type?: string,
    public version?: string,
  ) {}
}
