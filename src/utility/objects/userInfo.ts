import { UserRole } from '../enums/UserRole.enum';

export interface UserInfo {
  firstName: string;
  lastName: string;
  mail: string;
  role: UserRole;
}
