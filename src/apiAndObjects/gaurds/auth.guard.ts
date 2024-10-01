import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ActiveUserService } from 'src/services/activeUser.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private router: Router, private activeUserService: ActiveUserService) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.activeUserService.getActiveUser()?.groups?.length === 0) {
      this.router.navigate(['groups']);
      return false;
    }
    return true;
  }
}

export const ActiveGroupMember: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
