import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserBackofficeInfo } from 'src/utility/objects/userBackofficeInfo';

@Injectable({
  providedIn: 'root',
})
export class ActiveUserService {
  // private activeUserRole = new BehaviorSubject<UserRole | null>(null);
  // public activeUserRoleObservable = this.activeUserRole.asObservable();

  private activeUserInfo = new BehaviorSubject<UserBackofficeInfo | null>(null);
  public activeUserInfoObservable = this.activeUserInfo.asObservable();

  // public setActiveUserRole(role: UserRole | null): void {
  //   this.activeUserRole.next(role);
  // }

  public setActiveUserInfo(userInfo: UserBackofficeInfo | null): void {
    this.activeUserInfo.next(userInfo);
  }
}
