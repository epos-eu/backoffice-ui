import { SpatialExtent } from "../types/spatialExtent.type";
import { TemporalExtent } from "../types/temporalExtent.type";

export interface Service {
  "category": string[],
  "contactPoint": string[],
  "description": string,
  "fileProvenance": string,
  "identifier": string,
  "keywords": string,
  "name": string,
  "pageURL": string,
  "provider": string,
  "spatialExtent": SpatialExtent[],
  "temporalExtent": TemporalExtent[],
  "uid": string,
  "type": string
}
