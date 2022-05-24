import { Address } from '../types/address.type';
import { SpatialExtent } from '../types/spatialExtent.type';

export class Facility {
  constructor(
    public address: Address,
    public category: string[],
    public contactPoint: string[],
    public description: string,
    public fileProvenance: string,
    public isPartOf: string[],
    public pageURL: string[],
    public relation: string[],
    public spatialExtent: SpatialExtent[],
    public title: string,
    public type: string,
    public uid: string,
  ) {}
}
