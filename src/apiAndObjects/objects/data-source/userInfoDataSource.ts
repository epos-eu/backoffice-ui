import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { UserRole } from 'src/utility/enums/UserRole.enum';

export class UserInfoDataSource extends BaseObject {
  public static readonly KEYS = {
    EDU_PERSON_UNIQUE_ID: 'eduPersonUniqueId',
    INSTANCE_ID: 'instanceId',
    LAST_NAME: 'lastName',
    FIRST_NAME: 'firstName',
    EMAIL: 'email',
    META_ID: 'metaId',
    ROLE: 'role',
    ACCESSIBLE_SECTION: 'accessibleSection',
    REGISTERED: 'registered',
  };

  public readonly eduPersonUniqueId: string;
  public readonly instanceId: string;
  public readonly lastName: string;
  public readonly firstName: string;
  public readonly email: string;
  public readonly metaId: string;
  public readonly role: UserRole;
  public readonly accessibleSection: Array<string>;
  public readonly registered: boolean;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.eduPersonUniqueId = this._getString(UserInfoDataSource.KEYS.EDU_PERSON_UNIQUE_ID);
    this.instanceId = this._getString(UserInfoDataSource.KEYS.INSTANCE_ID);
    this.lastName = this._getString(UserInfoDataSource.KEYS.LAST_NAME);
    this.firstName = this._getString(UserInfoDataSource.KEYS.FIRST_NAME);
    this.email = this._getString(UserInfoDataSource.KEYS.EMAIL);
    this.metaId = this._getString(UserInfoDataSource.KEYS.META_ID);
    this.role = this._getValue(UserInfoDataSource.KEYS.ROLE) as UserRole;
    this.accessibleSection = this._getArray(UserInfoDataSource.KEYS.ACCESSIBLE_SECTION);
    this.registered = this._getBoolean(UserInfoDataSource.KEYS.REGISTERED);
  }
}
