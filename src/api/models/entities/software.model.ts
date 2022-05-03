import { Identifier } from '../types/identifier.type';
import { Paramter } from '../types/paramter.type';

export class Software {
  constructor(
    public category: string[],
    public contactPoint: string[],
    public description: string,
    public downloadURL: string,
    public fileProvenance: string,
    public identifier: Identifier[],
    public installURL: string,
    public keywords: string,
    public licenseURL: string,
    public mainEntityOfPage: string,
    public name: string,
    public parameter: Paramter[],
    public relation: string[],
    public requirements: string,
    public softwareVersion: string,
    public uid: string,
  ) {}
}
