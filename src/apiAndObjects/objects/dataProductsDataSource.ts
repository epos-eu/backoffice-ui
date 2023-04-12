import { State } from 'src/utility/enums/state.enum';
import { BaseObject } from '../_lib_code/objects/baseObject';
import { ContactPoint } from './entities/contactPoint.model';
import { Distribution } from './entities/distribution.model';
import { SpatialExtent } from './types/spatialExtent.type';
import { TemporalExtent } from './types/temporalExtent.type';

export class DataProductsDataSource extends BaseObject {
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
    ACCESS_RIGHT: 'accessRight',
    ACCRUAL_PERIODICITY: 'accrualPeriodicity',
    CATEGORY: 'category',
    CONTACT_POINT: 'contactPoint',
    CREATED: 'created',
    DESCRIPTION: 'description',
    DISTRIBUTION: 'distribution',
    HAS_PART: 'hasPart',
    IDENTIFIER: 'identifier',
    IS_PART_OF: 'isPartOf',
    ISSUED: 'issued',
    KEYWORDS: 'keywords',
    MODIFIED: 'modified',
    PROVENANCE: 'provenance',
    PUBLISHER: 'publisher',
    RELATION: 'relation',
    SPATIAL_EXTENT: 'spatialExtent',
    TEMPORAL_EXTENT: 'temporalExtent',
    TITLE: 'title',
    TYPE: 'type',
    VERSION_INFO: 'versionInfo',
    DOCUMENTATION: 'documentation',
    QUALITY_ASSURANCE: 'qualityAssurance',
  };

  public readonly instanceId: string;
  public readonly metaId: string;
  public readonly instanceChangedId: string;
  public readonly changeTimestamp: moment.Moment;
  public readonly operation: string;
  public readonly editorId: string;
  public readonly changeComment: string;
  public readonly version: string;
  public readonly state: State;
  public readonly toBeDelete: string;
  public readonly uid: string;
  public readonly fileProvenance: string;
  public readonly accessRight: string;
  public readonly accrualPeriodicity: string;
  public readonly category: Array<string>;
  public readonly contactPoint: Array<ContactPoint>;
  public readonly created: moment.Moment;
  public readonly description: Array<string>;
  public readonly distribution: Array<Distribution>;
  public readonly hasPart: Array<unknown>;
  public readonly identifier: Array<Record<string, unknown>>;
  public readonly isPartOf: Array<unknown>;
  public readonly issued: moment.Moment | undefined | null;
  public readonly keywords: string;
  public readonly modified: moment.Moment;
  public readonly provenance: Array<unknown>;
  public readonly publisher: Array<Record<string, unknown>>;
  public readonly relation: string;
  public readonly spatialExtent: Array<SpatialExtent>;
  public readonly temporalExtent: Array<TemporalExtent>;
  public readonly title: Array<string>;
  public readonly type: string;
  public readonly versionInfo: string;
  public readonly documentation: string;
  public readonly qualityAssurance: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.instanceId = this._getString(DataProductsDataSource.KEYS.INSTANCE_ID);
    this.metaId = this._getString(DataProductsDataSource.KEYS.META_ID);
    this.instanceChangedId = this._getString(DataProductsDataSource.KEYS.INSTANCE_CHANGE_ID);
    this.changeTimestamp = this._getDate(DataProductsDataSource.KEYS.CHANGE_TIMESTAMP);
    this.operation = this._getString(DataProductsDataSource.KEYS.OPERATION);
    this.editorId = this._getString(DataProductsDataSource.KEYS.EDITOR_ID);
    this.changeComment = this._getString(DataProductsDataSource.KEYS.CHANGE_COMMENT);
    this.version = this._getString(DataProductsDataSource.KEYS.VERSION);
    this.state = this._getValue(DataProductsDataSource.KEYS.STATE) as State;
    this.toBeDelete = this._getString(DataProductsDataSource.KEYS.TO_BE_DELETE);
    this.uid = this._getString(DataProductsDataSource.KEYS.UID);
    this.fileProvenance = this._getString(DataProductsDataSource.KEYS.FILE_PROVENANCE);
    this.accessRight = this._getString(DataProductsDataSource.KEYS.ACCESS_RIGHT);
    this.accrualPeriodicity = this._getString(DataProductsDataSource.KEYS.ACCRUAL_PERIODICITY);
    this.category = this._getArray(DataProductsDataSource.KEYS.CATEGORY);
    this.contactPoint = this._getArray(DataProductsDataSource.KEYS.CONTACT_POINT);
    this.created = this._getDate(DataProductsDataSource.KEYS.CREATED);
    this.description = this._getArray(DataProductsDataSource.KEYS.DESCRIPTION);
    this.distribution = this._getArray(DataProductsDataSource.KEYS.DISTRIBUTION);
    this.hasPart = this._getArray(DataProductsDataSource.KEYS.HAS_PART);
    this.identifier = this._getArray(DataProductsDataSource.KEYS.IDENTIFIER);
    this.isPartOf = this._getArray(DataProductsDataSource.KEYS.IS_PART_OF);
    this.issued = this._getDate(DataProductsDataSource.KEYS.ISSUED);
    this.keywords = this._getString(DataProductsDataSource.KEYS.KEYWORDS);
    this.modified = this._getDate(DataProductsDataSource.KEYS.MODIFIED);
    this.provenance = this._getArray(DataProductsDataSource.KEYS.PROVENANCE);
    this.publisher = this._getArray(DataProductsDataSource.KEYS.PUBLISHER);
    this.relation = this._getString(DataProductsDataSource.KEYS.RELATION);
    this.spatialExtent = this._getArray(DataProductsDataSource.KEYS.SPATIAL_EXTENT);
    this.temporalExtent = this._getArray(DataProductsDataSource.KEYS.TEMPORAL_EXTENT);
    this.title = this._getArray(DataProductsDataSource.KEYS.TITLE);
    this.type = this._getString(DataProductsDataSource.KEYS.TYPE);
    this.versionInfo = this._getString(DataProductsDataSource.KEYS.VERSION_INFO);
    this.documentation = this._getString(DataProductsDataSource.KEYS.DOCUMENTATION);
    this.qualityAssurance = this._getString(DataProductsDataSource.KEYS.QUALITY_ASSURANCE);
  }
}
