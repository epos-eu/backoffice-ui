import { State } from 'src/utility/enums/state.enum';
import { BaseObject } from '../_lib_code/objects/baseObject';

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
  };

  public readonly instanceId: string;
  public readonly changeTimestamp: Date;
  public readonly editorId: string;
  public readonly state: State;
  public readonly toBeDelete: string;
  public readonly fileProvenance: string;
  public readonly email: Array<string>;
  public readonly language: Array<string>;
  public readonly organization: string;
  public readonly role: string;
  public readonly person: Record<string, unknown>;
  public readonly telephone: Array<string>;
  public readonly metaId: string;
  public readonly uid: string;
  public readonly changeComment: string;

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
    this.organization = this._getString(ContactPointDataSource.KEYS.ORGANIZATION);
    this.role = this._getString(ContactPointDataSource.KEYS.ROLE);
    this.person = this._getValue(ContactPointDataSource.KEYS.PERSON) as Record<string, unknown>;
    this.telephone = this._getArray(ContactPointDataSource.KEYS.TELEPHONE);
    this.metaId = this._getString(ContactPointDataSource.KEYS.META_ID);
    this.uid = this._getString(ContactPointDataSource.KEYS.UID);
    this.changeComment = this._getString(ContactPointDataSource.KEYS.CHANGE_COMMENT);
  }
}
