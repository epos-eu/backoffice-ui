import { BaseObject } from '../_lib_code/objects/baseObject';

export class FacilitiesDataSource extends BaseObject {
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
  public readonly title: string;
  public readonly description: string;
  public readonly category: Array<string>;
  public readonly type: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.id = this._getString(FacilitiesDataSource.KEYS.UID);
    this.title = this._getString(FacilitiesDataSource.KEYS.TITLE);
    this.description = this._getString(FacilitiesDataSource.KEYS.DESCRIPTION);
    this.category = this._getArray(FacilitiesDataSource.KEYS.CATEGORY);
    this.type = this._getString(FacilitiesDataSource.KEYS.TYPE);
  }
}
