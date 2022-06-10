import { BaseObject } from '../_lib_code/objects/baseObject';
import { Named } from './named.interface';

export class DataProductDataSource extends BaseObject implements Named {
  public static readonly KEYS = {
    ACCESS_RIGHT: 'accessRight',
    ACCRUAL_PERIODICITY: 'accrualPeriodicity',
    CATEGORY: 'category',
    CONTACT_POINT: 'contactPoint',
    CREATED: 'created',
    DESCRIPTION: 'description',
    DISTRIBUTION: 'distribution',
    FILE_PROVENANCE: 'fileProvenance',
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
    UID: 'uid',
  };

  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly type: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.id = this._getString(DataProductDataSource.KEYS.UID);
    this.name = this._getString(DataProductDataSource.KEYS.TITLE);
    this.description = this._getString(DataProductDataSource.KEYS.DESCRIPTION);
    this.type = this._getString(DataProductDataSource.KEYS.TYPE);
  }
}
