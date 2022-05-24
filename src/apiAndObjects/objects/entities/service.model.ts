import { SpatialExtent } from '../types/spatialExtent.type';
import { TemporalExtent } from '../types/temporalExtent.type';

export class Service {
  constructor(
    public category: string[],
    public contactPoint: string[],
    public description: string,
    public fileProvenance: string,
    public identifier: string,
    public keywords: string,
    public name: string,
    public pageURL: string,
    public provider: string,
    public spatialExtent: SpatialExtent[],
    public temporalExtent: TemporalExtent[],
    public uid: string,
    public type: string,
  ) {}
}
