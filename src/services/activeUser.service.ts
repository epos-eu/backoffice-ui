import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserRole } from 'src/utility/enums/UserRole.enum';
import { UserInfo } from 'src/utility/objects/userInfo';

@Injectable({
  providedIn: 'root',
})
export class ActiveUserService {
  private activeUserRole = new Subject<UserRole>();
  public activeUserRoleObservable = this.activeUserRole.asObservable();

  private activeUserInfo = new Subject<UserInfo>();
  public activeUserInfoObservable = this.activeUserInfo.asObservable();

  // constructor() {}

  public setActiveUserRole(role: UserRole): void {
    this.activeUserRole.next(role);
  }

  public setActiveUserInfo(userInfo: UserInfo): void {
    this.activeUserInfo.next(userInfo);
  }
}
