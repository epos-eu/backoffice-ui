import { SpatialExtent } from "../types/spatialExtent.type";
import { TemporalExtent } from "../types/temporalExtent.type";

export interface Equipment {
  "category": string[],
  "contactPoint": string[],
  "description": string,
  "dynamicRange": string,
  "fileProvenance": string,
  "filter": string,
  "isPartOf": string[],
  "manufacturer": string,
  "name": string,
  "orientation": string,
  "pageURL": string,
  "relation": string[],
  "resolution": string,
  "samplePeriod": string,
  "serialNumber": string,
  "spatialExtent": SpatialExtent[],
  "temporalExtent": TemporalExtent[],
  "type": string,
  "uid": string
}
