import { Address } from "../types/address.type";
import { Identifier } from "../types/identifier.type";

export interface Person {
  "address": Address,
  "affiliation": string[],
  "cvurl": string,
  "email": string[],
  "familyName": string,
  "fileProvenance": string,
  "givenName": string,
  "identifier": Identifier[],
  "qualifications": string[],
  "telephone": string[],
  "uid": string,
}
