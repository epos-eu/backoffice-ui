import { Address } from "../types/address.type";
import { SpatialExtent } from "../types/spatialExtent.type";

export interface Facility {
  "address": Address,
  "category": string[],
  "contactPoint": string[],
  "description": string,
  "fileProvenance": string,
  "isPartOf": string[],
  "pageURL": string[],
  "relation": string[],
  "spatialExtent": SpatialExtent[],
  "title": string,
  "type": string,
  "uid": string
}
