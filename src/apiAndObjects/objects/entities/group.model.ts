import { UserRole } from 'src/utility/enums/UserRole.enum';

export class Group {
  constructor(public description: string, public id: string, public name: string, public role: UserRole) {}
}
