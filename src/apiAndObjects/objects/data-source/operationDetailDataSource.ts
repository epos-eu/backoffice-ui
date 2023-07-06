import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { State } from 'src/utility/enums/state.enum';
import { Mapping } from '../types/mapping.type';
import { EntityDetail } from '../types/entityDetail.type';

export class OperationDetailDataSource extends BaseObject {
  public static readonly KEYS = {
    CHANGE_COMMENT: 'changeComment',
    CHANGE_TIMESTAMP: 'changeTimestamp',
    EDITOR_ID: 'editorId',
    FILE_PROVENANCE: 'fileProvenance',
    GROUPS: 'groups',
    INSTANCE_CHANGED_ID: 'instanceChangedId',
    INSTANCE_ID: 'instanceId',
    MAPPING: 'mapping',
    META_ID: 'metaId',
    METHOD: 'method',
    OPERATION: 'operation',
    RETURNS: 'returns',
    STATE: 'state',
    TEMPLATE: 'template',
    TO_BE_DELETE: 'toBeDelete',
    UID: 'uid',
    VERSION: 'version',
    WEBSERVICE: 'webservice',
  };

  public readonly changeComment: string;
  public readonly changeTimestamp: Date;
  public readonly editorId: string;
  public readonly fileProvenance: string;
  public readonly groups: Array<EntityDetail>;
  public readonly instanceChangedId: string;
  public readonly instanceId: string;
  public readonly mapping: Array<Mapping>;
  public readonly metaId: string;
  public readonly method: string;
  public readonly operation: string;
  public readonly returns: Array<string>;
  public readonly state: State;
  public readonly template: string;
  public readonly toBeDelete: string;
  public readonly uid: string;
  public readonly version: string;
  public readonly webservice: Array<EntityDetail>;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.changeComment = this._getString(OperationDetailDataSource.KEYS.CHANGE_COMMENT);
    this.changeTimestamp = this._getDate(OperationDetailDataSource.KEYS.CHANGE_TIMESTAMP);
    this.editorId = this._getString(OperationDetailDataSource.KEYS.EDITOR_ID);
    this.fileProvenance = this._getString(OperationDetailDataSource.KEYS.FILE_PROVENANCE);
    this.groups = this._getArray(OperationDetailDataSource.KEYS.GROUPS);
    this.instanceChangedId = this._getString(OperationDetailDataSource.KEYS.INSTANCE_CHANGED_ID);
    this.instanceId = this._getString(OperationDetailDataSource.KEYS.INSTANCE_ID);
    this.mapping = this._getValue(OperationDetailDataSource.KEYS.MAPPING) as Array<Mapping>;
    this.metaId = this._getString(OperationDetailDataSource.KEYS.META_ID);
    this.method = this._getString(OperationDetailDataSource.KEYS.METHOD);
    this.operation = this._getString(OperationDetailDataSource.KEYS.OPERATION);
    this.returns = this._getArray(OperationDetailDataSource.KEYS.RETURNS);
    this.state = this._getValue(OperationDetailDataSource.KEYS.STATE) as State;
    this.template = this._getString(OperationDetailDataSource.KEYS.TEMPLATE);
    this.toBeDelete = this._getString(OperationDetailDataSource.KEYS.TO_BE_DELETE);
    this.uid = this._getString(OperationDetailDataSource.KEYS.UID);
    this.version = this._getString(OperationDetailDataSource.KEYS.VERSION);
    this.webservice = this._getArray(OperationDetailDataSource.KEYS.WEBSERVICE);
  }
}
