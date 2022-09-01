import { State } from 'src/utility/enums/state.enum';
import { BaseObject } from '../_lib_code/objects/baseObject';
import { ContactPoint } from './entities/contactPoint.model';
import { Provider } from './types/provider.type';
import { SpatialExtent } from './types/spatialExtent.type';
import { SupportedOperation } from './types/supportedOperation.type';
import { TemporalExtent } from './types/temporalExtent.type';

export class WebserviceDetailDataSource extends BaseObject {
  public static readonly KEYS = {
    INSTANCE_ID: 'instanceId',
    META_ID: 'metaId',
    INSTANCE_CHANGE_ID: 'instanceChangedId',
    CHANGE_TIMESTAMP: 'changeTimestamp',
    OPERATION: 'operation',
    EDITOR_ID: 'editorId',
    CHANGE_COMMENT: 'changeComment',
    VERSION: 'version',
    STATE: 'state',
    TO_BE_DELETE: 'toBeDelete',
    UID: 'uid',
    FILE_PROVENANCE: 'fileProvenance',
    CATEGORY: 'category',
    CONTACT_POINT: 'contactPoint',
    DATE_MODIFIED: 'dateModified',
    DATE_PUBLISHED: 'datePublished',
    DESCRIPTION: 'description',
    DOCUMENTATION: 'documentation',
    ENTRY_POINT: 'entryPoint',
    KEYWORDS: 'keywords',
    LICENSE: 'license',
    NAME: 'name',
    PROVIDER: 'provider',
    AAAI_TYPES: 'aaaiTypes',
    SPATIAL_EXTENT: 'spatialExtent',
    SUPPORTED_OPERATION: 'supportedOperation',
    TEMPORAL_EXTENT: 'temporalExtent',
  };

  public readonly instanceId: string;
  public readonly metaId: string;
  public readonly instanceChangedId: string;
  public readonly changeTimestamp: string;
  public readonly operation: string;
  public readonly editorId: string;
  public readonly changeComment: string;
  public readonly version: string;
  public readonly state: State;
  public readonly toBeDelete: string;
  public readonly uid: string;
  public readonly fileProvenance: string;
  public readonly category: Array<string>;
  public readonly contactPoint: Array<ContactPoint>;
  public readonly dateModified: moment.Moment;
  public readonly datePublished: moment.Moment;
  public readonly description: string;
  public readonly documentation: Array<string>;
  public readonly entryPoint: string;
  public readonly keywords: string;
  public readonly license: string;
  public readonly name: string;
  public readonly provider: unknown; //Provider
  public readonly aaaiTypes: string;
  public readonly spatialExtent: Array<SpatialExtent>;
  public readonly supportedOperation: Array<SupportedOperation>;
  public readonly temporalExtent: Array<TemporalExtent>;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.instanceId = this._getString(WebserviceDetailDataSource.KEYS.INSTANCE_ID);
    this.metaId = this._getString(WebserviceDetailDataSource.KEYS.META_ID);
    this.instanceChangedId = this._getString(WebserviceDetailDataSource.KEYS.INSTANCE_CHANGE_ID);
    this.changeTimestamp = this._getString(WebserviceDetailDataSource.KEYS.CHANGE_TIMESTAMP);
    this.operation = this._getString(WebserviceDetailDataSource.KEYS.OPERATION);
    this.editorId = this._getString(WebserviceDetailDataSource.KEYS.EDITOR_ID);
    this.changeComment = this._getString(WebserviceDetailDataSource.KEYS.CHANGE_COMMENT);
    this.version = this._getString(WebserviceDetailDataSource.KEYS.VERSION);
    this.state = this._getEnumFromValue(WebserviceDetailDataSource.KEYS.STATE, State);
    this.toBeDelete = this._getString(WebserviceDetailDataSource.KEYS.TO_BE_DELETE);
    this.uid = this._getString(WebserviceDetailDataSource.KEYS.UID);
    this.fileProvenance = this._getString(WebserviceDetailDataSource.KEYS.FILE_PROVENANCE);
    this.category = this._getArray(WebserviceDetailDataSource.KEYS.CATEGORY);
    this.contactPoint = this._getArray(WebserviceDetailDataSource.KEYS.CONTACT_POINT);
    this.dateModified = this._getDate(WebserviceDetailDataSource.KEYS.DATE_MODIFIED);
    this.datePublished = this._getDate(WebserviceDetailDataSource.KEYS.DATE_PUBLISHED);
    this.description = this._getString(WebserviceDetailDataSource.KEYS.DESCRIPTION);
    this.documentation = this._getArray(WebserviceDetailDataSource.KEYS.DOCUMENTATION);
    this.entryPoint = this._getString(WebserviceDetailDataSource.KEYS.ENTRY_POINT);
    this.keywords = this._getString(WebserviceDetailDataSource.KEYS.KEYWORDS);
    this.license = this._getString(WebserviceDetailDataSource.KEYS.LICENSE);
    this.name = this._getString(WebserviceDetailDataSource.KEYS.NAME);
    this.provider = this._getValue(WebserviceDetailDataSource.KEYS.PROVIDER) as Provider;
    this.aaaiTypes = this._getString(WebserviceDetailDataSource.KEYS.AAAI_TYPES);
    this.spatialExtent = this._getArray(WebserviceDetailDataSource.KEYS.SPATIAL_EXTENT);
    this.supportedOperation = this._getArray(WebserviceDetailDataSource.KEYS.SUPPORTED_OPERATION);
    this.temporalExtent = this._getArray(WebserviceDetailDataSource.KEYS.TEMPORAL_EXTENT);
  }
}
