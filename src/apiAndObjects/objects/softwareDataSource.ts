import { BaseObject } from '../_lib_code/objects/baseObject';
import { Named } from './named.interface';

export class SoftwareDataSource extends BaseObject implements Named {
  public static readonly KEYS = {
    CATEGORY: 'category',
    CONTACT_POINT: 'contactPoint',
    DESCRIPTION: 'description',
    DOWNLOAD_URL: 'downloadUrl',
    FILE_PROVENANCE: 'fileProvenance',
    IDENTIFIER: 'identifier',
    INSTALL_URL: 'installURL',
    KEYWORDS: 'keywords',
    LICENSE_URL: 'licenseURL',
    MAIN_ENTITY_OF_PAGE: 'mainEntityOfPage',
    NAME: 'name',
    PARAMETER: 'parameter',
    RELATION: 'relation',
    REQUIREMENTS: 'requirements',
    SOFTWARE_VERSION: 'softwareVersion',
    UID: 'uid',
  };

  public readonly id: string;
  public readonly name: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.id = this._getString(SoftwareDataSource.KEYS.UID);
    this.name = this._getString(SoftwareDataSource.KEYS.NAME);
  }
}
