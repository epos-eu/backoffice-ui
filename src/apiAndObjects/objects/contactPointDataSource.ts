import { State } from 'src/utility/enums/state.enum';
import { BaseObject } from '../_lib_code/objects/baseObject';
import { Group } from './entities/group.model';

export class ContactPointDataSource extends BaseObject {
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

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.instanceId = this._getString(ContactPointDataSource.KEYS.INSTANCE_ID);
    this.changeTimestamp = this._getDate(ContactPointDataSource.KEYS.CHANGE_TIMESTAMP);
    this.editorId = this._getString(ContactPointDataSource.KEYS.EDITOR_ID);
    this.state = this._getValue(ContactPointDataSource.KEYS.STATE) as State;
    this.toBeDelete = this._getString(ContactPointDataSource.KEYS.TO_BE_DELETE);
    this.fileProvenance = this._getString(ContactPointDataSource.KEYS.FILE_PROVENANCE);
    this.email = this._getArray(ContactPointDataSource.KEYS.EMAIL);
    this.language = this._getArray(ContactPointDataSource.KEYS.LANGUAGE);
    this.organization = this._getValue(ContactPointDataSource.KEYS.ORGANIZATION) as Organization;
    this.role = this._getString(ContactPointDataSource.KEYS.ROLE);
    this.person = this._getValue(ContactPointDataSource.KEYS.PERSON) as Person;
    this.telephone = this._getArray(ContactPointDataSource.KEYS.TELEPHONE);
    this.metaId = this._getString(ContactPointDataSource.KEYS.META_ID);
    this.uid = this._getString(ContactPointDataSource.KEYS.UID);
    this.changeComment = this._getString(ContactPointDataSource.KEYS.CHANGE_COMMENT);
    this.groups = this._getArray(ContactPointDataSource.KEYS.GROUPS);
    this.instanceChangedId = this._getString(ContactPointDataSource.KEYS.INSTANCE_CHANGED_ID);
    this.operation = this._getString(ContactPointDataSource.KEYS.OPERATION);
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
