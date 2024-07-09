import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { Group, LinkedEntity } from 'generated/backofficeSchemas';
import { Status } from 'src/utility/enums/status.enum';

export class DistributionDetailDataSource extends BaseObject {
  public static readonly KEYS = {
    ACCESS_SERVICE: 'accessService',
    ACCESS_URL: 'accessURL',
    CHANGE_COMMENT: 'changeComment',
    CHANGE_TIMESTAMP: 'changeTimestamp',
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
    STATUS: 'status',
    TITLE: 'title',
    TYPE: 'type',
    TO_BE_DELETE: 'toBeDelete',
    UID: 'uid',
    VERSION: 'version',
    VERSION_ID: 'versionId',
  };

  public readonly accessService: LinkedEntity;
  public readonly accessURL: Array<LinkedEntity>;
  public readonly changeComment: string;
  public readonly changeTimestamp: Date;
  public readonly dataPolicy: string;
  public readonly dataProduct: Array<LinkedEntity>;
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
  public readonly status: Status;
  public readonly title: Array<string>;
  public readonly toBeDelete: string;
  public readonly type: string;
  public readonly uid: string;
  public readonly version: string;
  public readonly versionId: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);
    this.instanceId = this._getString(DistributionDetailDataSource.KEYS.INSTANCE_ID);
    this.changeTimestamp = this._getDate(DistributionDetailDataSource.KEYS.CHANGE_TIMESTAMP);
    this.status = this._getValue(DistributionDetailDataSource.KEYS.STATUS) as Status;
    this.toBeDelete = this._getString(DistributionDetailDataSource.KEYS.TO_BE_DELETE);
    this.fileProvenance = this._getString(DistributionDetailDataSource.KEYS.FILE_PROVENANCE);
    this.accessService = this._getValue(DistributionDetailDataSource.KEYS.ACCESS_SERVICE) as LinkedEntity;
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
    this.dataPolicy = this._getString(DistributionDetailDataSource.KEYS.DATA_POLICY);
    this.groups = this._getArray(DistributionDetailDataSource.KEYS.GROUPS);
    this.instanceChangedId = this._getString(DistributionDetailDataSource.KEYS.INSTANCE_CHANGED_ID);
    this.version = this._getString(DistributionDetailDataSource.KEYS.VERSION);
    this.versionId = this._getString(DistributionDetailDataSource.KEYS.VERSION_ID);
    this.licence = this._getString(DistributionDetailDataSource.KEYS.LICENCE);
    this.operation = this._getString(DistributionDetailDataSource.KEYS.OPERATION);
  }
}
