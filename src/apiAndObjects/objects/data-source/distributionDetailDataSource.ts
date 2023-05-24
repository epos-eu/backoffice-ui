import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { State } from 'src/utility/enums/state.enum';
import { EntityDetail } from '../types/entityDetail.type';
import { Group } from '../entities/group.model';

export class DistributionDetailDataSource extends BaseObject {
  public static readonly KEYS = {
    ACCESS_SERVICE: 'accessService',
    ACCESS_URL: 'accessUrl',
    CHANGE_COMMENT: 'changeComment',
    CHANGE_TIMESTAMP: 'changeTimestamp',
    CONFORMS_TO: 'conformsTo',
    DATA_POLICY: 'dataPolicy',
    DATA_PRODUCT: 'dataProduct',
    DESCRIPTION: 'description',
    DOWNLOAD_URL: 'downloadURL',
    EDITOR_ID: 'editorId',
    FILE_PROVENANCE: 'fileProvenance',
    FORMAT: 'format',
    GROUPS: 'groups',
    INSTANCE_CHANGED_ID: 'instanceChangedId',
    INSTANCE_ID: 'instanceId',
    ISSUED: 'issued',
    LICENCE: 'licence',
    META_ID: 'metaId',
    MODIFIED: 'modified',
    OPERATION: 'operation',
    STATE: 'state',
    TITLE: 'title',
    TYPE: 'type',
    TO_BE_DELETE: 'toBeDelete',
    UID: 'uid',
    VERSION: 'version',
  };

  public readonly accessService: EntityDetail;
  public readonly accessURL: Array<string>;
  public readonly changeComment: string;
  public readonly changeTimestamp: Date;
  public readonly conformsTo: string;
  public readonly dataPolicy: string;
  public readonly dataProduct: Array<EntityDetail>;
  public readonly description: Array<string>;
  public readonly downloadURL: Array<string>;
  public readonly editorId: string;
  public readonly fileProvenance: string;
  public readonly format: string;
  public readonly groups: Array<Group>;
  public readonly instanceChangedId: string;
  public readonly instanceId: string;
  public readonly issued: Date;
  public readonly licence: string;
  public readonly metaId: string;
  public readonly modified: string;
  public readonly operation: string;
  public readonly state: State;
  public readonly title: Array<string>;
  public readonly toBeDelete: string;
  public readonly type: string;
  public readonly uid: string;
  public readonly version: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);
    this.instanceId = this._getString(DistributionDetailDataSource.KEYS.INSTANCE_ID);
    this.changeTimestamp = this._getDate(DistributionDetailDataSource.KEYS.CHANGE_TIMESTAMP);
    this.state = this._getValue(DistributionDetailDataSource.KEYS.STATE) as State;
    this.toBeDelete = this._getString(DistributionDetailDataSource.KEYS.TO_BE_DELETE);
    this.fileProvenance = this._getString(DistributionDetailDataSource.KEYS.FILE_PROVENANCE);
    this.accessService = this._getValue(DistributionDetailDataSource.KEYS.ACCESS_SERVICE) as EntityDetail;
    this.accessURL = this._getArray(DistributionDetailDataSource.KEYS.ACCESS_URL);
    this.description = this._getArray(DistributionDetailDataSource.KEYS.DESCRIPTION);
    this.downloadURL = this._getArray(DistributionDetailDataSource.KEYS.DOWNLOAD_URL);
    this.dataProduct = this._getArray(DistributionDetailDataSource.KEYS.DATA_PRODUCT);
    this.format = this._getString(DistributionDetailDataSource.KEYS.FORMAT);
    this.issued = this._getDate(DistributionDetailDataSource.KEYS.ISSUED);
    this.modified = this._getString(DistributionDetailDataSource.KEYS.MODIFIED);
    this.title = this._getArray(DistributionDetailDataSource.KEYS.TITLE);
    this.type = this._getString(DistributionDetailDataSource.KEYS.TYPE);
    this.metaId = this._getString(DistributionDetailDataSource.KEYS.META_ID);
    this.uid = this._getString(DistributionDetailDataSource.KEYS.UID);
    this.editorId = this._getString(DistributionDetailDataSource.KEYS.EDITOR_ID);
    this.changeComment = this._getString(DistributionDetailDataSource.KEYS.CHANGE_COMMENT);
    this.conformsTo = this._getString(DistributionDetailDataSource.KEYS.CONFORMS_TO);
    this.dataPolicy = this._getString(DistributionDetailDataSource.KEYS.DATA_POLICY);
    this.groups = this._getArray(DistributionDetailDataSource.KEYS.GROUPS);
    this.instanceChangedId = this._getString(DistributionDetailDataSource.KEYS.INSTANCE_CHANGED_ID);
    this.version = this._getString(DistributionDetailDataSource.KEYS.VERSION);
    this.licence = this._getString(DistributionDetailDataSource.KEYS.LICENCE);
    this.operation = this._getString(DistributionDetailDataSource.KEYS.OPERATION);
  }
}
