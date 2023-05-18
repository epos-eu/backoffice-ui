import { State } from 'src/utility/enums/state.enum';
import { BaseObject } from '../../_lib_code/objects/baseObject';
import { Group } from '../entities/group.model';

export class ContactPointDetailDataSource extends BaseObject {
  public static readonly KEYS = {
    INSTANCE_ID: 'instanceId',
    CHANGE_TIMESTAMP: 'changeTimestamp',
    EDITOR_ID: 'editorId',
    STATE: 'state',
    TO_BE_DELETE: 'toBeDelete',
    UID: 'uid',
    FILE_PROVENANCE: 'fileProvenance',
    EMAIL: 'email',
    LANGUAGE: 'language',
    ORGANIZATION: 'organization',
    ROLE: 'role',
    PERSON: 'person',
    TELEPHONE: 'telephone',
    META_ID: 'metaId',
    CHANGE_COMMENT: 'changeComment',
    GROUPS: 'groups',
    INSTANCE_CHANGED_ID: 'instanceChangedId',
    OPERATION: 'operation',
    VERSION: 'version',
  };

  public readonly instanceId: string;
  public readonly changeTimestamp: Date;
  public readonly editorId: string;
  public readonly state: State;
  public readonly toBeDelete: string;
  public readonly fileProvenance: string;
  public readonly email: Array<string>;
  public readonly language: Array<string>;
  public readonly organization: Organization;
  public readonly role: string;
  public readonly person: Person;
  public readonly telephone: Array<string>;
  public readonly metaId: string;
  public readonly uid: string;
  public readonly changeComment: string;
  public readonly groups: Array<Group>;
  public readonly instanceChangedId: string;
  public readonly operation: string;
  public readonly version: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.instanceId = this._getString(ContactPointDetailDataSource.KEYS.INSTANCE_ID);
    this.changeTimestamp = this._getDate(ContactPointDetailDataSource.KEYS.CHANGE_TIMESTAMP);
    this.editorId = this._getString(ContactPointDetailDataSource.KEYS.EDITOR_ID);
    this.state = this._getValue(ContactPointDetailDataSource.KEYS.STATE) as State;
    this.toBeDelete = this._getString(ContactPointDetailDataSource.KEYS.TO_BE_DELETE);
    this.fileProvenance = this._getString(ContactPointDetailDataSource.KEYS.FILE_PROVENANCE);
    this.email = this._getArray(ContactPointDetailDataSource.KEYS.EMAIL);
    this.language = this._getArray(ContactPointDetailDataSource.KEYS.LANGUAGE);
    this.organization = this._getValue(ContactPointDetailDataSource.KEYS.ORGANIZATION) as Organization;
    this.role = this._getString(ContactPointDetailDataSource.KEYS.ROLE);
    this.person = this._getValue(ContactPointDetailDataSource.KEYS.PERSON) as Person;
    this.telephone = this._getArray(ContactPointDetailDataSource.KEYS.TELEPHONE);
    this.metaId = this._getString(ContactPointDetailDataSource.KEYS.META_ID);
    this.uid = this._getString(ContactPointDetailDataSource.KEYS.UID);
    this.changeComment = this._getString(ContactPointDetailDataSource.KEYS.CHANGE_COMMENT);
    this.groups = this._getArray(ContactPointDetailDataSource.KEYS.GROUPS);
    this.instanceChangedId = this._getString(ContactPointDetailDataSource.KEYS.INSTANCE_CHANGED_ID);
    this.operation = this._getString(ContactPointDetailDataSource.KEYS.OPERATION);
    this.version = this._getString(ContactPointDetailDataSource.KEYS.VERSION);
  }
}

type Organization = {
  entityType: string;
  instanceId: string;
  metaId: string;
  uid: string;
};

type Person = {
  entityType: string;
  instanceId: string;
  metaId: string;
  uid: string;
};
