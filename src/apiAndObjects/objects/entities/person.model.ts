import { Address } from '../types/address.type';
import { Identifier } from '../types/identifier.type';

export class Person {
  constructor(
    public address: Address,
    public affiliation: string[],
    public cvurl: string,
    public email: string[],
    public familyName: string,
    public fileProvenance: string,
    public givenName: string,
    public identifier: Identifier[],
    public qualifications: string[],
    public telephone: string[],
    public uid: string,
  ) {}
}
