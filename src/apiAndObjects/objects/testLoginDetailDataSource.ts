import { BaseObject } from '../_lib_code/objects/baseObject';
import { Named } from './named.interface';

export class TestLoginDetailDataSource extends BaseObject implements Named {
  public static readonly KEYS = {
    // CATEGORY: 'category',
    // CONTACT_POINT: 'contactPoint',
    // DATE_MODIFIED: 'dateModified',
    // DATE_PUBLISHED: 'datePublished',
    // DESCRIPTION: 'description',
    // DOCUMENTATION: 'documentation',
    // ENTRY_POINT: 'entryPoint',
    // FILE_PROVENANCE: 'fileProvenance',
    SECTIONS: 'sections',
    USER_INFO: 'userInfo',
    STATISTICS: 'statistics',
    NAME: 'name',
    UID: 'uid',
  };

  public readonly id: string;
  public readonly name: string;
  public readonly userInfo: unknown;
  public readonly sections: unknown;
  public readonly statistics: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.id = this._getString(TestLoginDetailDataSource.KEYS.UID);
    this.name = this._getString(TestLoginDetailDataSource.KEYS.NAME);
    this.userInfo = this._getValue(TestLoginDetailDataSource.KEYS.USER_INFO);
    this.statistics = this._getString(TestLoginDetailDataSource.KEYS.STATISTICS);
    this.sections = this._getValue(TestLoginDetailDataSource.KEYS.SECTIONS);
  }
}
