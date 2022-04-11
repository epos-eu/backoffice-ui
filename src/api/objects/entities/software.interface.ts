import { Identifier } from "../types/identifier.type";
import { Paramter } from "../types/paramter.type";

export interface Software {
  "category": string[],
  "contactPoint": string[],
  "description": string,
  "downloadURL": string,
  "fileProvenance": string,
  "identifier": Identifier[],
  "installURL": string,
  "keywords": string,
  "licenseURL": string,
  "mainEntityOfPage": string,
  "name": string,
  "parameter": Paramter[],
  "relation": string[],
  "requirements": string,
  "softwareVersion": string,
  "uid": string
}
