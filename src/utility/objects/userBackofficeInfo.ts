import { UserRole } from '../enums/UserRole.enum';

export interface UserBackofficeInfo {
  firstName: string;
  lastName: string;
  mail: string;
  role: UserRole;
}
