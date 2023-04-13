import { BaseObject } from '../_lib_code/objects/baseObject';
import { AccessService } from './types/accessService.type';
import { State } from 'src/utility/enums/state.enum';

export class DistributionDetailDataSource extends BaseObject {
  public static readonly KEYS = {
    INSTANCE_ID: 'instanceId',
    CHANGE_TIMESTAMP: 'changeTimestamp',
    STATE: 'state',
    TO_BE_DELETE: 'toBeDelete',
    FILE_PROVENANCE: 'fileProvenance',
    ACCESS_SERVICE: 'accessService',
    ACCESS_URL: 'accessUrl',
    DESCRIPTION: 'description',
    DOWNLOAD_URL: 'downloadURL',
    FORMAT: 'format',
    ISSUED: 'issued',
    MODIFIED: 'modified',
    TITLE: 'title',
    TYPE: 'type',
    META_ID: 'metaId',
    UID: 'uid',
    EDITOR_ID: 'editorId',
    CHANGE_COMMENT: 'changeComment',
  };

  public readonly instanceId: string;
  public readonly changeTimestamp: Date;
  public readonly state: string;
  public readonly toBeDelete: string;
  public readonly fileProvenance: string;
  public readonly accessService: AccessService;
  public readonly accessURL: Array<string>;
  public readonly description: Array<string>;
  public readonly downloadURL: Array<string>;
  public readonly format: string;
  public readonly issued: Date;
  public readonly modified: string;
  public readonly title: Array<string>;
  public readonly type: string;
  public readonly metaId: string;
  public readonly uid: string;
  public readonly editorId: string;
  public readonly changeComment: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.instanceId = this._getString(DistributionDetailDataSource.KEYS.INSTANCE_ID);
    this.changeTimestamp = this._getDate(DistributionDetailDataSource.KEYS.CHANGE_TIMESTAMP);
    this.state = this._getEnumFromValue(DistributionDetailDataSource.KEYS.STATE, State);
    this.toBeDelete = this._getString(DistributionDetailDataSource.KEYS.TO_BE_DELETE);
    this.fileProvenance = this._getString(DistributionDetailDataSource.KEYS.FILE_PROVENANCE);
    this.accessService = this._getValue(DistributionDetailDataSource.KEYS.ACCESS_SERVICE) as AccessService;
    this.accessURL = this._getArray(DistributionDetailDataSource.KEYS.ACCESS_URL);
    this.description = this._getArray(DistributionDetailDataSource.KEYS.DESCRIPTION);
    this.downloadURL = this._getArray(DistributionDetailDataSource.KEYS.DOWNLOAD_URL);
    this.format = this._getString(DistributionDetailDataSource.KEYS.FORMAT);
    this.issued = this._getDate(DistributionDetailDataSource.KEYS.ISSUED);
    this.modified = this._getString(DistributionDetailDataSource.KEYS.MODIFIED);
    this.title = this._getArray(DistributionDetailDataSource.KEYS.TITLE);
    this.type = this._getString(DistributionDetailDataSource.KEYS.TYPE);
    this.metaId = this._getString(DistributionDetailDataSource.KEYS.META_ID);
    this.uid = this._getString(DistributionDetailDataSource.KEYS.UID);
    this.editorId = this._getString(DistributionDetailDataSource.KEYS.EDITOR_ID);
    this.changeComment = this._getString(DistributionDetailDataSource.KEYS.CHANGE_COMMENT);
  }
}
