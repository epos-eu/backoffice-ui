import { Identifier } from "../types/identifier.type";
import { SpatialExtent } from "../types/spatialExtent.type";
import { TemporalExtent } from "../types/temporalExtent.type";


export class DataProduct {

  constructor(
    public accessRight: string,
    public accrualPeriodicity: string,
    public category: string[],
    public contactPoint: string[],
    public created: string,
    public description: string[],
    public distribution: string[],
    public fileProvenance: string,
    public hasPart: string[],
    public identifier: Identifier[],
    public isPartOf: string,
    public issued: string,
    public keywords: string,
    public modified: string,
    public provenance: string[],
    public publisher: string[],
    public relation: string[],
    public spatialExtent: SpatialExtent[],
    public temporalExtent: TemporalExtent[],
    public title: string[],
    public type: string,
    public versionInfo: string,
    public uid: string
  ) {}
}
