import { BaseObject } from '../_lib_code/objects/baseObject';
import { Named } from './named.interface';

export class DistributionDataSource extends BaseObject implements Named {
  public static readonly KEYS = {
    ACCESS_SERVICE: 'accessService',
    ACCESS_URL: 'accessURL',
    DESCRIPTION: 'description',
    DOWNLOAD_URL: 'downloadURL',
    FILE_PROVENANCE: 'fileProvenance',
    FORMAT: 'format',
    ISSUED: 'issued',
    LICENCE: 'licence',
    MODIFIED: 'modified',
    TITLE: 'title',
    TYPE: 'type',
    UID: 'uid',
  };

  public readonly id: string;
  public readonly name: string;
  public readonly issued: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.id = this._getString(DistributionDataSource.KEYS.UID);
    this.name = this._getString(DistributionDataSource.KEYS.TITLE);
    this.issued = this._getString(DistributionDataSource.KEYS.ISSUED);
  }
}
