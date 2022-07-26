import { BaseObject } from '../_lib_code/objects/baseObject';
import { Named } from './named.interface';

export class RevisionsDataSource extends BaseObject implements Named {
  public static readonly KEYS = {
    UID: 'uid',
    VERSION: 'version',
    CREATED_AT: 'createdAt',
    CREATED_BY: 'createdBy',
  };

  public readonly id: string;
  public readonly name: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.id = this._getString(RevisionsDataSource.KEYS.UID);
    this.name = this._getString(RevisionsDataSource.KEYS.VERSION);
  }
}
