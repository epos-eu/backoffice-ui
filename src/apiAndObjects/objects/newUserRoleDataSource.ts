import { UserRole } from 'src/utility/enums/UserRole.enum';
import { BaseObject } from '../_lib_code/objects/baseObject';

export class NewUserRoleDataSource extends BaseObject {
  public static readonly KEYS = {
    NEW_ROLE: 'newRole',
  };

  public readonly newRole: UserRole;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.newRole = this._getValue(NewUserRoleDataSource.KEYS.NEW_ROLE) as UserRole;
  }
}
