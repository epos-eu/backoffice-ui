import { BaseObject } from '../_lib_code/objects/baseObject';
import { Named } from './named.interface';

export class ServiceDataSource extends BaseObject implements Named {
  public static readonly KEYS = {
    CATEGORY: 'category',
    CONTACT_POINT: 'contactPoint',
    DESCRIPTION: 'description',
    FILE_PROVENANCE: 'fileProvenance',
    IDENTIFIER: 'identifier',
    KEYWORDS: 'keywords',
    NAME: 'name',
    PAGE_URL: 'pageURL',
    PROVIDER: 'provider',
    SPATIAL_EXTENT: 'spatialExtent',
    TEMPORAL_EXTENT: 'temporalExtent',
    TYPE: 'type',
    UID: 'uid',
  };

  public readonly id: string;
  public readonly name: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.id = this._getString(ServiceDataSource.KEYS.UID);
    this.name = this._getString(ServiceDataSource.KEYS.NAME);
  }
}
