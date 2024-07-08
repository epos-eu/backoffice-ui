import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';

export class GroupsDataSource extends BaseObject {
  public static readonly KEYS = {
    NAME: 'name',
    DESCRIPTION: 'description',
    ENTITIES: 'entities',
    ID: 'id',
    USERS: 'users',
  };

  public readonly name: string;
  public readonly description: string;
  public readonly entities: Array<string>;
  public readonly id: string;
  public readonly users: Array<string>;

  protected constructor() {
    super();

    this.name = this._getString(GroupsDataSource.KEYS.NAME);
    this.description = this._getString(GroupsDataSource.KEYS.DESCRIPTION);
    this.entities = this._getArray(GroupsDataSource.KEYS.ENTITIES);
    this.id = this._getString(GroupsDataSource.KEYS.ID);
    this.users = this._getArray(GroupsDataSource.KEYS.USERS);
  }
}
