import { BaseObject } from '../_lib_code/objects/baseObject';

export class RevisionsDataSource extends BaseObject {
  public static readonly KEYS = {
    UID: 'uid',
    VERSION: 'version',
    CREATED_AT: 'createdAt',
    CREATED_BY: 'createdBy',
  };
  public readonly id: string;
  public readonly version: string;
  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);
    this.id = this._getString(RevisionsDataSource.KEYS.UID);
    this.version = this._getString(RevisionsDataSource.KEYS.VERSION);
  }
}
