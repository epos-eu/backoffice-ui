import { Documentation } from '../types/documentation.type';
import { SpatialExtent } from '../types/spatialExtent.type';
import { TemporalExtent } from '../types/temporalExtent.type';

export class WebService {
  constructor(
    public category: string[],
    public contactPoint: string[],
    public dateModified: string,
    public datePublished: string,
    public description: string,
    public documentation: Documentation[],
    public entryPoint: string,
    public fileProvenance: string,
    public keywords: string,
    public license: string,
    public name: string,
    public provider: string,
    public spatialExtent: SpatialExtent[],
    public supportedOperation: string[],
    public temporalExtent: TemporalExtent[],
    public uid: string,
  ) {}
}
