import { BaseObject } from '../_lib_code/objects/baseObject';

export class LoginDetailDataSource extends BaseObject {
  public static readonly KEYS = {
    SECTIONS: 'sections',
    USER_INFO: 'userInfo',
    STATISTICS: 'statistics',
  };

  public readonly userInfo: unknown;
  public readonly sections: unknown;
  public readonly statistics: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.userInfo = this._getValue(LoginDetailDataSource.KEYS.USER_INFO);
    this.statistics = this._getString(LoginDetailDataSource.KEYS.STATISTICS);
    this.sections = this._getValue(LoginDetailDataSource.KEYS.SECTIONS);
  }
}
