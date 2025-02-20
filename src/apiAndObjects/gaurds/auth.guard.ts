import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ActiveUserService } from 'src/services/activeUser.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(
    private readonly router: Router,
    private readonly activeUserService: ActiveUserService,
    private readonly snackbarService: SnackbarService,
  ) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const activeUser = this.activeUserService.getActiveUser();
    if (activeUser?.groups?.length === 0) {
      this.router.navigate(['browse/groups']);
      this.snackbarService.openSnackbar('Please join or create a group.', 'close', SnackbarType.WARNING, 6000, [
        'snackbar',
        'mat-toolbar',
        'snackbar-warning',
      ]);
      return false;
    }
    return true;
  }
}

export const ActiveGroupMember: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
