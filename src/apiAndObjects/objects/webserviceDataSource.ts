import { BaseObject } from '../_lib_code/objects/baseObject';
import { Named } from './named.interface';

export class WebserviceDataSource extends BaseObject implements Named {
  public static readonly KEYS = {
    CATEGORY: 'category',
    CONTACT_POINT: 'contactPoint',
    DATE_MODIFIED: 'dateModified',
    DATE_PUBLISHED: 'datePublished',
    DESCRIPTION: 'description',
    DOCUMENTATION: 'documentation',
    ENTRY_POINT: 'entryPoint',
    FILE_PROVENANCE: 'fileProvenance',
    KEYWORDS: 'keywords',
    LICENSE: 'license',
    NAME: 'name',
    PROVIDER: 'provider',
    SPATIAL_EXTENT: 'spatialExtent',
    SUPPORTED_OPERATION: 'supportedOperation',
    TEMPORAL_EXTENT: 'temporalExtent',
    UID: 'uid',
  };

  public readonly id: string;
  public readonly name: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.id = this._getString(WebserviceDataSource.KEYS.UID);
    this.name = this._getString(WebserviceDataSource.KEYS.NAME);
  }
}
