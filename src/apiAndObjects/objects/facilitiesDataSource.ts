import { BaseObject } from '../_lib_code/objects/baseObject';
import { Named } from './named.interface';

export class FacilitiesDataSource extends BaseObject implements Named {
  public static readonly KEYS = {
    ADDRESS: 'address',
    CATEGORY: 'category',
    CONTACT_POINT: 'contactPoint',
    DESCRIPTION: 'description',
    FILE_PROVENANCE: 'fileProvenance',
    IS_PART_OF: 'isPartOf',
    PAGE_URL: 'pageURL',
    RELATION: 'relation',
    SPATIAL_EXTENT: 'spatialExtent',
    TITLE: 'title',
    TYPE: 'type',
    UID: 'uid',
  };

  public readonly id: string;
  public readonly name: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.id = this._getString(FacilitiesDataSource.KEYS.UID);
    this.name = this._getString(FacilitiesDataSource.KEYS.TITLE);
  }
}
