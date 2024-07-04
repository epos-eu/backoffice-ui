import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { Status } from 'src/utility/enums/status.enum';
import { UserRole } from 'src/utility/enums/UserRole.enum';
import { Address } from '../types/address.type';
import { EntityDetail } from '../types/entityDetail.type';

export class PersonDataSource extends BaseObject {
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
    AFFILIATION: 'affiliation',
    EMAIL: 'email',
    FAMILY_NAME: 'familyName',
    GIVEN_NAME: 'givenName',
    IDENTIFIER: 'identifier',
    QUALIFICATIONS: 'qualifications',
    TELEPHONE: 'telephone',
    ROLE: 'role',
    AUTH_IDENTIFIER: 'authIdentifier',
    CV_URL: 'cvurl',
  };

  public readonly instanceId: string;
  public readonly metaId: string;
  public readonly instanceChangedId: string;
  public readonly changeTimestamp: Date;
  public readonly operation: EntityDetail;
  public readonly editorId: string;
  public readonly changeComment: string;
  public readonly version: string;
  public readonly state: Status;
  public readonly toBeDelete: string;
  public readonly fileProvenance: string;
  public readonly groupIds: Array<string>;
  public readonly uid: string;
  public readonly address: Address;
  public readonly affiliation: Array<EntityDetail>;
  public readonly email: Array<string>;
  public readonly familyName: string;
  public readonly givenName: string;
  public readonly identifier: Array<Record<string, unknown>>;
  public readonly qualifications: Array<string>;
  public readonly telephone: Array<string>;
  public readonly role: UserRole;
  public readonly authIdentifier: string;
  public readonly cvurl: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.instanceId = this._getString(PersonDataSource.KEYS.INSTANCE_ID);
    this.metaId = this._getString(PersonDataSource.KEYS.META_ID);
    this.instanceChangedId = this._getString(PersonDataSource.KEYS.INSTANCE_CHANGED_ID);
    this.changeTimestamp = this._getDate(PersonDataSource.KEYS.CHANGE_TIMESTAMP);
    this.operation = this._getValue(PersonDataSource.KEYS.OPERATION) as EntityDetail;
    this.editorId = this._getString(PersonDataSource.KEYS.EDITOR_ID);
    this.changeComment = this._getString(PersonDataSource.KEYS.CHANGE_COMMENT);
    this.version = this._getString(PersonDataSource.KEYS.VERSION);
    this.state = this._getValue(PersonDataSource.KEYS.STATE) as Status;
    this.toBeDelete = this._getString(PersonDataSource.KEYS.TO_BE_DELETE);
    this.fileProvenance = this._getString(PersonDataSource.KEYS.FILE_PROVENANCE);
    this.groupIds = this._getArray(PersonDataSource.KEYS.GROUP_IDS);
    this.uid = this._getString(PersonDataSource.KEYS.UID);
    this.address = this._getValue(PersonDataSource.KEYS.ADDRESS) as Address;
    this.affiliation = this._getArray(PersonDataSource.KEYS.AFFILIATION);
    this.email = this._getArray(PersonDataSource.KEYS.EMAIL);
    this.familyName = this._getString(PersonDataSource.KEYS.FAMILY_NAME);
    this.givenName = this._getString(PersonDataSource.KEYS.GIVEN_NAME);
    this.identifier = this._getArray(PersonDataSource.KEYS.IDENTIFIER);
    this.qualifications = this._getArray(PersonDataSource.KEYS.QUALIFICATIONS);
    this.telephone = this._getArray(PersonDataSource.KEYS.TELEPHONE);
    this.role = this._getValue(PersonDataSource.KEYS.ROLE) as UserRole;
    this.authIdentifier = this._getString(PersonDataSource.KEYS.AUTH_IDENTIFIER);
    this.cvurl = this._getString(PersonDataSource.KEYS.CV_URL);
  }
}
