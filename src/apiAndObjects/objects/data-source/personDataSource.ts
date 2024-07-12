import { Group, LinkedEntity } from 'generated/backofficeSchemas';
import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { Status } from 'src/utility/enums/status.enum';

export class PersonDataSource extends BaseObject {
  public static readonly KEYS = {
    ACRONYM: 'acronym',
    ADDRESS: 'address',
    CHANGE_COMMENT: 'changeComment',
    CHANGE_TIMESTAMP: 'changeTimestamp',
    CONTACT_POINT: 'contactPoint',
    EDITOR_ID: 'editorId',
    EMAIL: 'email',
    FILE_PROVENANCE: 'fileProvenance',
    GROUPS: 'groups',
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
    STATUS: 'status',
    TELEPHONE: 'telephone',
    TO_BE_DELETE: 'toBeDelete',
    TYPE: 'type',
    UID: 'uid',
    URL: 'url',
    VERSION: 'version',
    VERSION_ID: 'versionId',
  };

  public readonly acronym: string;
  public readonly address: LinkedEntity;
  public readonly changeComment: string;
  public readonly changeTimestamp: string;
  public readonly contactPoint: LinkedEntity[];
  public readonly editorId: string;
  public readonly email: string[];
  public readonly fileProvenance: string;
  public readonly groups: Group[];
  public readonly identifier: LinkedEntity[];
  public readonly instanceChangedId: string;
  public readonly instanceId: string;
  public readonly legalName: LinkedEntity[];
  public readonly leiCode: string;
  public readonly logo: string;
  public readonly maturity: string;
  public readonly memberOf: LinkedEntity[];
  public readonly metaId: string;
  public readonly operation: string;
  public readonly owns: LinkedEntity[];
  public readonly status: Status;
  public readonly telephone: string[];
  public readonly toBeDelete: string;
  public readonly type: string;
  public readonly uid: string;
  public readonly url: string;
  public readonly versionId: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.acronym = this._getString(PersonDataSource.KEYS.ACRONYM);
    this.address = this._getValue(PersonDataSource.KEYS.ADDRESS) as LinkedEntity;
    this.changeComment = this._getString(PersonDataSource.KEYS.CHANGE_COMMENT);
    this.changeTimestamp = this._getString(PersonDataSource.KEYS.CHANGE_TIMESTAMP);
    this.contactPoint = this._getArray(PersonDataSource.KEYS.CONTACT_POINT);
    this.editorId = this._getString(PersonDataSource.KEYS.EDITOR_ID);
    this.email = this._getArray(PersonDataSource.KEYS.EMAIL);
    this.fileProvenance = this._getString(PersonDataSource.KEYS.FILE_PROVENANCE);
    this.groups = this._getArray(PersonDataSource.KEYS.GROUPS);
    this.identifier = this._getArray(PersonDataSource.KEYS.IDENTIFIER);
    this.instanceChangedId = this._getString(PersonDataSource.KEYS.INSTANCE_CHANGED_ID);
    this.instanceId = this._getString(PersonDataSource.KEYS.INSTANCE_ID);
    this.legalName = this._getArray(PersonDataSource.KEYS.LEGAL_NAME);
    this.leiCode = this._getString(PersonDataSource.KEYS.LEI_CODE);
    this.logo = this._getString(PersonDataSource.KEYS.LOGO);
    this.maturity = this._getString(PersonDataSource.KEYS.MATURITY);
    this.memberOf = this._getArray(PersonDataSource.KEYS.MEMBER_OF);
    this.metaId = this._getString(PersonDataSource.KEYS.META_ID);
    this.operation = this._getString(PersonDataSource.KEYS.OPERATION);
    this.owns = this._getArray(PersonDataSource.KEYS.OWNS);
    this.status = this._getValue(PersonDataSource.KEYS.STATUS) as Status;
    this.telephone = this._getArray(PersonDataSource.KEYS.TELEPHONE);
    this.toBeDelete = this._getString(PersonDataSource.KEYS.TO_BE_DELETE);
    this.type = this._getString(PersonDataSource.KEYS.TYPE);
    this.uid = this._getString(PersonDataSource.KEYS.UID);
    this.url = this._getString(PersonDataSource.KEYS.URL);
    this.versionId = this._getString(PersonDataSource.KEYS.VERSION_ID);
  }
}
