import { BaseObject } from '../_lib_code/objects/baseObject';
import { Named } from './named.interface';

export class EquipmentDataSource extends BaseObject implements Named {
  public static readonly KEYS = {
    CATEGORY: 'category',
    CONTACT_POINT: 'contactPoint',
    DESCRIPTION: 'description',
    DYNAMIC_RANGE: 'dynamicRange',
    FILE_PROVENANCE: 'fileProvenance',
    FILTER: 'filter',
    IS_PART_OF: 'isPartOf',
    MANUFACTURER: 'manufacturer',
    NAME: 'name',
    ORIENTATION: 'orientation',
    PAGE_URL: 'pageURL',
    RELATION: 'relation',
    RESOLUTION: 'resolution',
    SAMPLE_PERIOD: 'samplePeriod',
    SERIAL_NUMBER: 'serialNumber',
    SPATIAL_EXTENT: 'spatialExtent',
    TEMPORAL_EXTENT: 'temporalExtent',
    TYPE: 'type',
    UID: 'uid',
  };

  public readonly id: string;
  public readonly name: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.id = this._getString(EquipmentDataSource.KEYS.UID);
    this.name = this._getString(EquipmentDataSource.KEYS.NAME);
  }
}
