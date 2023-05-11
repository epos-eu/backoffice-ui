import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';

export class GroupsDataSource extends BaseObject {
  public static readonly KEYS = {
    NAME: 'name',
    DESCRIPTION: 'description',
  };

  public readonly name: string;
  public readonly description: string;

  protected constructor() {
    super();

    this.name = this._getString(GroupsDataSource.KEYS.NAME);
    this.description = this._getString(GroupsDataSource.KEYS.DESCRIPTION);
  }
}
