import { State } from 'src/utility/enums/state.enum';
import { Address } from '../types/address.type';
import { EntityDetail } from '../types/entityDetail.type';
import { Identifier } from '../types/identifier.type';

export class Organization {
  constructor(
    public uid: string,
    public acronym: string,
    public address: Address,
    public changeComment: string,
    public changeTimestamp: Date,
    public contactPoint: Array<EntityDetail>,
    public editorId: string,
    public email: Array<string>,
    public fileProvenance: string,
    public identifier: Array<Identifier>,
    public instanceChangedId: string,
    public instanceId: string,
    public legalName: Array<string>,
    public leiCode: string,
    public logo: string,
    public maturity: string,
    public memberOf: Array<EntityDetail>,
    public metaId: string,
    public operation: string,
    public owns: Array<string>,
    public state: State,
    public telephone: Array<string>,
    public toBeDelete: string,
    public type: string,
    public url: string,
    public version: string,
  ) {}
}
