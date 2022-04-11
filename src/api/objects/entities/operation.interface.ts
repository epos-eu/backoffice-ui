import { Mapping } from "../types/mapping.type";

export interface Operation {
  "fileProvenance": string,
  "mapping": Mapping[],
  "method": string,
  "returns": string[],
  "template": string,
  "uid": string
}
