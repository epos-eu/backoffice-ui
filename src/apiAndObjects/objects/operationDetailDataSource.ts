import { BaseObject } from '../_lib_code/objects/baseObject';
import { State } from 'src/utility/enums/state.enum';
import { Mapping } from './types/mapping.type';

export class OperationDetailDataSource extends BaseObject {
  public static readonly KEYS = {
    INSTANCE_ID: 'instanceId',
    CHANGE_TIMESTAMP: 'changeTimestamp',
    STATE: 'state',
    TO_BE_DELETE: 'toBeDelete',
    UID: 'uid',
    FILE_PROVENANCE: 'fileProvenance',
    METHOD: 'method',
    RETURNS: 'returns',
    TEMPLATE: 'template',
    MAPPING: 'mapping',
    META_ID: 'metaId',
    EDITOR_ID: 'editorId',
    CHANGE_COMMENT: 'changeComment',
  };

  public readonly instanceId: string;
  public readonly changeTimestamp: Date;
  public readonly state: string;
  public readonly toBeDelete: string;
  public readonly uid: string;
  public readonly fileProvenance: string;
  public readonly method: string;
  public readonly returns: Array<string>;
  public readonly template: string;
  public readonly mapping: Array<Mapping>;
  public readonly metaId: string;
  public readonly editorId: string;
  public readonly changeComment: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.instanceId = this._getString(OperationDetailDataSource.KEYS.INSTANCE_ID);
    this.changeTimestamp = this._getDate(OperationDetailDataSource.KEYS.CHANGE_TIMESTAMP);
    this.state = this._getEnumFromValue(OperationDetailDataSource.KEYS.STATE, State);
    this.toBeDelete = this._getString(OperationDetailDataSource.KEYS.TO_BE_DELETE);
    this.metaId = this._getString(OperationDetailDataSource.KEYS.META_ID);
    this.uid = this._getString(OperationDetailDataSource.KEYS.UID);
    this.fileProvenance = this._getString(OperationDetailDataSource.KEYS.FILE_PROVENANCE);
    this.method = this._getString(OperationDetailDataSource.KEYS.METHOD);
    this.returns = this._getArray(OperationDetailDataSource.KEYS.RETURNS);
    this.template = this._getString(OperationDetailDataSource.KEYS.TEMPLATE);
    this.mapping = this._getValue(OperationDetailDataSource.KEYS.MAPPING) as Array<Mapping>;
    this.editorId = this._getString(OperationDetailDataSource.KEYS.EDITOR_ID);
    this.changeComment = this._getString(OperationDetailDataSource.KEYS.CHANGE_COMMENT);
  }
}
