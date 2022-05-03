import { SpatialExtent } from '../types/spatialExtent.type';
import { TemporalExtent } from '../types/temporalExtent.type';

export class Equipment {
  constructor(
    public category: string[],
    public contactPoint: string[],
    public description: string,
    public dynamicRange: string,
    public fileProvenance: string,
    public filter: string,
    public isPartOf: string[],
    public manufacturer: string,
    public name: string,
    public orientation: string,
    public pageURL: string,
    public relation: string[],
    public resolution: string,
    public samplePeriod: string,
    public serialNumber: string,
    public spatialExtent: SpatialExtent[],
    public temporalExtent: TemporalExtent[],
    public type: string,
    public uid: string,
  ) {}
}
