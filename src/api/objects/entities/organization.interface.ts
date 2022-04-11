import { Address } from "../types/address.type";
import { Identifier } from "../types/identifier.type";

export interface Organization {
  "address": Address,
  "contactPoint": string[],
  "email": string[],
  "fileProvenance": string,
  "identifier": Identifier[],
  "legalName": string,
  "leiCode": string,
  "logo": string,
  "memberOf": string[],
  "owns": string[],
  "telephone": string[],
  "uid": string,
  "url": string,
}
