import { Address } from '../types/address.type';
import { Identifier } from '../types/identifier.type';

export class Organization {
  constructor(
    public address: Address,
    public contactPoint: string[],
    public email: string[],
    public fileProvenance: string,
    public identifier: Identifier[],
    public legalName: string,
    public leiCode: string,
    public logo: string,
    public memberOf: string[],
    public owns: string[],
    public telephone: string[],
    public uid: string,
    public url: string,
  ) {}
}
