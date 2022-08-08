import { Sections } from 'src/utility/objects/login/sections';
import { UserBackofficeInfo } from 'src/utility/objects/userBackofficeInfo';
import { BaseObject } from '../_lib_code/objects/baseObject';

export class IndexDetailDataSource extends BaseObject {
  public static readonly KEYS = {
    SECTIONS: 'sections',
    USER_INFO: 'userInfo',
    STATISTICS: 'statistics',
  };

  public readonly userInfo: UserBackofficeInfo;
  public readonly sections: Array<Sections>;
  public readonly statistics: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.userInfo = this._getValue(IndexDetailDataSource.KEYS.USER_INFO) as UserBackofficeInfo;
    this.statistics = this._getString(IndexDetailDataSource.KEYS.STATISTICS);
    this.sections = this._getValue(IndexDetailDataSource.KEYS.SECTIONS) as Array<Sections>;
  }
}
