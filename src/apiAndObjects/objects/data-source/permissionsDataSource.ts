import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';

export class PermissionsDataSource extends BaseObject {
  public static readonly KEYS = {
    GROUP: 'group',
    PERMISSION: 'permission',
  };

  public readonly group: string;
  public readonly permission: string;

  protected constructor() {
    super();

    this.group = this._getString(PermissionsDataSource.KEYS.GROUP);
    this.permission = this._getString(PermissionsDataSource.KEYS.PERMISSION);
  }
}
