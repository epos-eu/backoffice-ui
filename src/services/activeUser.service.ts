import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from 'src/utility/objects/userInfo';

@Injectable({
  providedIn: 'root',
})
export class ActiveUserService {
  // private activeUserRole = new BehaviorSubject<UserRole | null>(null);
  // public activeUserRoleObservable = this.activeUserRole.asObservable();

  private activeUserInfo = new BehaviorSubject<UserInfo | null>(null);
  public activeUserInfoObservable = this.activeUserInfo.asObservable();

  // public setActiveUserRole(role: UserRole | null): void {
  //   this.activeUserRole.next(role);
  // }

  public setActiveUserInfo(userInfo: UserInfo | null): void {
    this.activeUserInfo.next(userInfo);
  }
}
