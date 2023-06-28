import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { State } from 'src/utility/enums/state.enum';
import { Address } from '../types/address.type';

export class OrganizationDataSource extends BaseObject {
  public static readonly KEYS = {
    INSTANCE_ID: 'instanceId',
    META_ID: 'metaId',
    INSTANCE_CHANGED_ID: 'instanceChangedId',
    CHANGE_TIMESTAMP: 'changeTimestamp',
    OPERATION: 'operation',
    EDITOR_ID: 'editorId',
    CHANGE_COMMENT: 'changeComment',
    VERSION: 'version',
    STATE: 'state',
    TO_BE_DELETE: 'toBeDelete',
    FILE_PROVENANCE: 'fileProvenance',
    GROUP_IDS: 'groupIds',
    UID: 'uid',
    ADDRESS: 'address',
    CONTACT_POINT: 'contactPoint',
    EMAIL: 'email',
    IDENTIFIER: 'identifier',
    ACRONYM: 'acronym',
    LEGAL_NAME: 'legalName',
    LEI_CODE: 'leiCode',
    LOGO: 'logo',
    MEMBER_OF: 'memberOf',
    OWNS: 'owns',
    TELEPHONE: 'telephone',
    TYPE: 'type',
    MATURITY: 'maturity',
    URL: 'url',
  };

  public readonly instanceId: string;
  public readonly metaId: string;
  public readonly instanceChangedId: string;
  public readonly changeTimestamp: Date;
  public readonly operation: unknown;
  public readonly editorId: string;
  public readonly changeComment: string;
  public readonly version: string;
  public readonly state: State;
  public readonly toBeDelete: string;
  public readonly fileProvenance: string;
  public readonly groupIds: Array<string>;
  public readonly uid: string;
  public readonly address: Address;
  public readonly contactPoint: Array<Record<string, unknown>>;
  public readonly email: Array<string>;
  public readonly identifier: Array<Record<string, unknown>>;
  public readonly acronym: string;
  public readonly legalName: Array<string>;
  public readonly leiCode: string;
  public readonly logo: string;
  public readonly memberOf: Array<string>;
  public readonly owns: string;
  public readonly telephone: Array<string>;
  public readonly type: string;
  public readonly maturity: string;
  public readonly url: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.instanceId = this._getString(OrganizationDataSource.KEYS.INSTANCE_ID);
    this.metaId = this._getString(OrganizationDataSource.KEYS.META_ID);
    this.instanceChangedId = this._getString(OrganizationDataSource.KEYS.INSTANCE_CHANGED_ID);
    this.changeTimestamp = this._getDate(OrganizationDataSource.KEYS.CHANGE_TIMESTAMP);
    this.operation = this._getValue(OrganizationDataSource.KEYS.OPERATION) as unknown;
    this.editorId = this._getString(OrganizationDataSource.KEYS.EDITOR_ID);
    this.changeComment = this._getString(OrganizationDataSource.KEYS.CHANGE_COMMENT);
    this.version = this._getString(OrganizationDataSource.KEYS.VERSION);
    this.state = this._getValue(OrganizationDataSource.KEYS.STATE) as State;
    this.toBeDelete = this._getString(OrganizationDataSource.KEYS.TO_BE_DELETE);
    this.fileProvenance = this._getString(OrganizationDataSource.KEYS.FILE_PROVENANCE);
    this.groupIds = this._getArray(OrganizationDataSource.KEYS.GROUP_IDS);
    this.uid = this._getString(OrganizationDataSource.KEYS.UID);
    this.address = this._getValue(OrganizationDataSource.KEYS.ADDRESS) as Address;
    this.contactPoint = this._getArray(OrganizationDataSource.KEYS.CONTACT_POINT);
    this.email = this._getArray(OrganizationDataSource.KEYS.EMAIL);
    this.identifier = this._getArray(OrganizationDataSource.KEYS.IDENTIFIER);
    this.acronym = this._getString(OrganizationDataSource.KEYS.ACRONYM);
    this.legalName = this._getArray(OrganizationDataSource.KEYS.LEGAL_NAME);
    this.leiCode = this._getString(OrganizationDataSource.KEYS.LEI_CODE);
    this.logo = this._getString(OrganizationDataSource.KEYS.LOGO);
    this.memberOf = this._getArray(OrganizationDataSource.KEYS.MEMBER_OF);
    this.owns = this._getString(OrganizationDataSource.KEYS.OWNS);
    this.telephone = this._getArray(OrganizationDataSource.KEYS.TELEPHONE);
    this.type = this._getString(OrganizationDataSource.KEYS.TYPE);
    this.maturity = this._getString(OrganizationDataSource.KEYS.MATURITY);
    this.url = this._getString(OrganizationDataSource.KEYS.URL);
  }
}
