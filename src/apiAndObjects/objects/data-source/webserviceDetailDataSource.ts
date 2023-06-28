import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { State } from 'src/utility/enums/state.enum';
import { ContactPoint } from '../entities/contactPoint.model';
import { Distribution } from '../entities/distribution.model';
import { Documentation } from '../types/documentation.type';
import { SpatialExtent } from '../types/spatialExtent.type';
import { TemporalExtent } from '../types/temporalExtent.type';
import { EntityDetail } from '../types/entityDetail.type';

export class WebserviceDetailDataSource extends BaseObject {
  public static readonly KEYS = {
    AAAI_TYPES: 'aaaiTypes',
    CATEGORY: 'category',
    CHANGE_COMMENT: 'changeComment',
    CHANGE_TIMESTAMP: 'changeTimestamp',
    CONTACT_POINT: 'contactPoint',
    DATE_MODIFIED: 'dateModified',
    DATE_PUBLISHED: 'datePublished',
    DESCRIPTION: 'description',
    DISTRIBUTION: 'distribution',
    DOCUMENTATION: 'documentation',
    EDITOR_ID: 'editorId',
    ENTRY_POINT: 'entryPoint',
    FILE_PROVENANCE: 'fileProvenance',
    IDENTIFIER: 'identifier',
    INSTANCE_CHANGED_ID: 'instanceChangedId',
    INSTANCE_ID: 'instanceId',
    KEYWORDS: 'keywords',
    LICENSE: 'license',
    META_ID: 'metaId',
    NAME: 'name',
    OPERATION: 'operation',
    PROVIDER: 'provider',
    SCHEMA_IDENTIFIER: 'schemaIdentifier',
    SPATIAL_EXTENT: 'spatialExtent',
    STATE: 'state',
    SUPPORTED_OPERATION: 'supportedOperation',
    TEMPORAL_EXTENT: 'temporalExtent',
    TO_BE_DELETE: 'toBeDelete',
    UID: 'uid',
    VERSION: 'version',
  };

  public readonly aaaiTypes: string;
  public readonly category: Array<string>;
  public readonly changeComment: string;
  public readonly changeTimestamp: Date;
  public readonly contactPoint: Array<ContactPoint>;
  public readonly dateModified: Date;
  public readonly datePublished: Date;
  public readonly description: string;
  public readonly distribution: Array<Distribution>;
  public readonly documentation: Array<Documentation>;
  public readonly editorId: string;
  public readonly entryPoint: string;
  public readonly fileProvenance: string;
  public readonly identifier: Array<string>;
  public readonly instanceChangedId: string;
  public readonly instanceId: string;
  public readonly keywords: string;
  public readonly license: string;
  public readonly metaId: string;
  public readonly name: string;
  public readonly operation: string;
  public readonly provider: EntityDetail;
  public readonly schemaIdentifier: string;
  public readonly spatialExtent: Array<SpatialExtent>;
  public readonly state: State;
  public readonly supportedOperation: Array<EntityDetail>;
  public readonly temporalExtent: Array<TemporalExtent>;
  public readonly toBeDelete: string;
  public readonly uid: string;
  public readonly version: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.aaaiTypes = this._getString(WebserviceDetailDataSource.KEYS.AAAI_TYPES);
    this.category = this._getArray(WebserviceDetailDataSource.KEYS.CATEGORY);
    this.changeComment = this._getString(WebserviceDetailDataSource.KEYS.CHANGE_COMMENT);
    this.changeTimestamp = this._getDate(WebserviceDetailDataSource.KEYS.CHANGE_TIMESTAMP);
    this.contactPoint = this._getArray(WebserviceDetailDataSource.KEYS.CONTACT_POINT);
    this.dateModified = this._getDate(WebserviceDetailDataSource.KEYS.DATE_MODIFIED);
    this.datePublished = this._getDate(WebserviceDetailDataSource.KEYS.DATE_PUBLISHED);
    this.description = this._getString(WebserviceDetailDataSource.KEYS.DESCRIPTION);
    this.distribution = this._getArray(WebserviceDetailDataSource.KEYS.DISTRIBUTION);
    this.documentation = this._getArray(WebserviceDetailDataSource.KEYS.DOCUMENTATION);
    this.editorId = this._getString(WebserviceDetailDataSource.KEYS.EDITOR_ID);
    this.entryPoint = this._getString(WebserviceDetailDataSource.KEYS.ENTRY_POINT);
    this.fileProvenance = this._getString(WebserviceDetailDataSource.KEYS.FILE_PROVENANCE);
    this.identifier = this._getArray(WebserviceDetailDataSource.KEYS.IDENTIFIER);
    this.instanceChangedId = this._getString(WebserviceDetailDataSource.KEYS.INSTANCE_CHANGED_ID);
    this.instanceId = this._getString(WebserviceDetailDataSource.KEYS.INSTANCE_ID);
    this.keywords = this._getString(WebserviceDetailDataSource.KEYS.KEYWORDS);
    this.license = this._getString(WebserviceDetailDataSource.KEYS.LICENSE);
    this.metaId = this._getString(WebserviceDetailDataSource.KEYS.META_ID);
    this.name = this._getString(WebserviceDetailDataSource.KEYS.NAME);
    this.operation = this._getString(WebserviceDetailDataSource.KEYS.OPERATION);
    this.provider = this._getValue(WebserviceDetailDataSource.KEYS.PROVIDER) as EntityDetail;
    this.schemaIdentifier = this._getString(WebserviceDetailDataSource.KEYS.SCHEMA_IDENTIFIER);
    this.spatialExtent = this._getArray(WebserviceDetailDataSource.KEYS.SPATIAL_EXTENT);
    this.state = this._getValue(WebserviceDetailDataSource.KEYS.STATE) as State;
    this.supportedOperation = this._getArray(WebserviceDetailDataSource.KEYS.SUPPORTED_OPERATION);
    this.temporalExtent = this._getArray(WebserviceDetailDataSource.KEYS.TEMPORAL_EXTENT);
    this.toBeDelete = this._getString(WebserviceDetailDataSource.KEYS.TO_BE_DELETE);
    this.uid = this._getString(WebserviceDetailDataSource.KEYS.UID);
    this.version = this._getString(WebserviceDetailDataSource.KEYS.VERSION);
  }
}
