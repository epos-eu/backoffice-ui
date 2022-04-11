import { Identifier } from "../types/identifier.type";
import { SpatialExtent } from "../types/spatialExtent.type";
import { TemporalExtent } from "../types/temporalExtent.type";


export interface DataProduct {
  "accessRight": string,
  "accrualPeriodicity": string,
  "category": string[],
  "contactPoint": string[],
  "created": string,
  "description": string[],
  "distribution": string[],
  "fileProvenance": string,
  "hasPart": string[],
  "identifier": Identifier[],
  "isPartOf": string,
  "issued": string,
  "keywords": string,
  "modified": string,
  "provenance": string[],
  "publisher": string[],
  "relation": string[],
  "spatialExtent": SpatialExtent[],
  "temporalExtent": TemporalExtent[],
  "title": string[],
  "type": string,
  "versionInfo": string,
  "uid": string
}
