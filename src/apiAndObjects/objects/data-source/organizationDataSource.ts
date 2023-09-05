import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { State } from 'src/utility/enums/state.enum';
import { Address } from '../types/address.type';
import { EntityDetail } from '../types/entityDetail.type';
import { Identifier } from '../types/identifier.type';

export class OrganizationDataSource extends BaseObject {
  public static readonly KEYS = {
    ACRONYM: 'acronym',
    ADDRESS: 'address',
    CHANGE_COMMENT: 'changeComment',
    CHANGE_TIMESTAMP: 'changeTimestamp',
    CONTACT_POINT: 'contactPoint',
    EDITOR_ID: 'editorId',
    EMAIL: 'email',
    FILE_PROVENANCE: 'fileProvenance',
    IDENTIFIER: 'identifier',
    INSTANCE_CHANGED_ID: 'instanceChangedId',
    INSTANCE_ID: 'instanceId',
    LEGAL_NAME: 'legalName',
    LEI_CODE: 'leiCode',
    LOGO: 'logo',
    MATURITY: 'maturity',
    MEMBER_OF: 'memberOf',
    META_ID: 'metaId',
    OPERATION: 'operation',
    OWNS: 'owns',
    STATE: 'state',
    TELEPHONE: 'telephone',
    TO_BE_DELETE: 'toBeDelete',
    TYPE: 'type',
    UID: 'uid',
    URL: 'url',
    VERSION: 'version',
  };

  public acronym: string;
  public address: Address;
  public changeComment: string;
  public changeTimestamp: Date;
  public contactPoint: Array<EntityDetail>;
  public editorId: string;
  public email: Array<string>;
  public fileProvenance: string;
  public identifier: Array<Identifier>;
  public instanceChangedId: string;
  public instanceId: string;
  public legalName: Array<string>;
  public leiCode: string;
  public logo: string;
  public maturity: string;
  public memberOf: Array<EntityDetail>;
  public metaId: string;
  public operation?: string;
  public owns: Array<string>;
  public state: State;
  public telephone: Array<string>;
  public toBeDelete: string;
  public type: string;
  public uid: string;
  public url: string;
  public version: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.acronym = this._getString(OrganizationDataSource.KEYS.ACRONYM);
    this.address = this._getValue(OrganizationDataSource.KEYS.ADDRESS) as Address;
    this.changeComment = this._getString(OrganizationDataSource.KEYS.CHANGE_COMMENT);
    this.changeTimestamp = this._getDate(OrganizationDataSource.KEYS.CHANGE_TIMESTAMP);
    this.contactPoint = this._getArray(OrganizationDataSource.KEYS.CONTACT_POINT);
    this.editorId = this._getString(OrganizationDataSource.KEYS.EDITOR_ID);
    this.email = this._getArray(OrganizationDataSource.KEYS.EMAIL);
    this.fileProvenance = this._getString(OrganizationDataSource.KEYS.FILE_PROVENANCE);
    this.identifier = this._getArray(OrganizationDataSource.KEYS.IDENTIFIER);
    this.instanceChangedId = this._getString(OrganizationDataSource.KEYS.INSTANCE_CHANGED_ID);
    this.instanceId = this._getString(OrganizationDataSource.KEYS.INSTANCE_ID);
    this.legalName = this._getArray(OrganizationDataSource.KEYS.LEGAL_NAME);
    this.leiCode = this._getString(OrganizationDataSource.KEYS.LEI_CODE);
    this.logo = this._getString(OrganizationDataSource.KEYS.LOGO);
    this.maturity = this._getString(OrganizationDataSource.KEYS.MATURITY);
    this.memberOf = this._getArray(OrganizationDataSource.KEYS.MEMBER_OF);
    this.metaId = this._getString(OrganizationDataSource.KEYS.META_ID);
    this.operation = this._getString(OrganizationDataSource.KEYS.OPERATION);
    this.owns = this._getArray(OrganizationDataSource.KEYS.OWNS);
    this.state = this._getValue(OrganizationDataSource.KEYS.STATE) as State;
    this.telephone = this._getArray(OrganizationDataSource.KEYS.TELEPHONE);
    this.toBeDelete = this._getString(OrganizationDataSource.KEYS.TO_BE_DELETE);
    this.type = this._getString(OrganizationDataSource.KEYS.TYPE);
    this.uid = this._getString(OrganizationDataSource.KEYS.UID);
    this.url = this._getString(OrganizationDataSource.KEYS.URL);
    this.version = this._getString(OrganizationDataSource.KEYS.VERSION);
  }
}
