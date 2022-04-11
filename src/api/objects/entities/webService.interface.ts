import { Documentation } from "../types/documentation.type";
import { SpatialExtent } from "../types/spatialExtent.type";
import { TemporalExtent } from "../types/temporalExtent.type";

export interface WebService {
  "category": string[],
  "contactPoint": string[],
  "dateModified": string,
  "datePublished": string,
  "description": string,
  "documentation": Documentation[],
  "entryPoint": string,
  "fileProvenance": string,
  "keywords": string,
  "license": string,
  "name": string,
  "provider": string,
  "spatialExtent": SpatialExtent[],
  "supportedOperation": string[],
  "temporalExtent": TemporalExtent[],
  "uid": string
}
