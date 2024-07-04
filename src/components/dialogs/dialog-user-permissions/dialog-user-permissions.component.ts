import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SnackbarService } from 'src/services/snackbar.service';
// import { Entity } from 'src/utility/enums/entity.enum';
import { UserRole } from 'src/utility/enums/UserRole.enum';
import { DialogData } from '../baseDialogService.abstract';
// import { SetUserRoleParams } from 'src/apiAndObjects/api/user/putUserDetail';
import { User, UserGroup } from 'generated/backofficeSchemas';

@Component({
  selector: 'app-dialog-user-permissions',
  templateUrl: './dialog-user-permissions.component.html',
  styleUrls: ['./dialog-user-permissions.component.scss'],
})
export class DialogUserPermissionsComponent implements OnInit {
  public userDetails!: User;
  public userRole = UserRole;
  public currentRole = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData<User>,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  private getUserRole = (user: User) => user.groups?.find((group: UserGroup) => group.role);

  private initData(): void {
    const user: User = this.data.dataIn;
    this.userDetails = user;
    switch (true) {
      case this.getUserRole(user)?.role === UserRole.ADMIN:
        this.currentRole = UserRole.ADMIN;
        break;
      case this.getUserRole(user)?.role === UserRole.EDITOR:
        this.currentRole = UserRole.EDITOR;
        break;
      case this.getUserRole(user)?.role === UserRole.REVIEWER:
        this.currentRole = UserRole.REVIEWER;
        break;
      case this.getUserRole(user)?.role === UserRole.VIEWER:
        this.currentRole = UserRole.VIEWER;
        break;
    }
  }

  public setNewUserRole(currentRole: string): void {
    // const params: SetUserRoleParams = {
    //   instanceId: this.data.dataIn.authIdentifier,
    //   role: currentRole as UserRole,
    // };
    // this.apiService.endpoints[Entity.USER].update
    //   .call(params)
    //   .then(() => {
    //     this.data.dataOut = true;
    //     this.snackbarService.openSnackbar(`User Successfully changed to ${currentRole}`, 'close', 'success', 3000, [
    //       'snackbar',
    //       'mat-toolbar',
    //       'snackbar-success',
    //     ]);
    //   })
    //   .catch(() => {
    //     this.snackbarService.openSnackbar(`Error: failed to change user role`, 'close', 'error', 3000, [
    //       'snackbar',
    //       'mat-toolbar',
    //       'snackbar-error',
    //     ]);
    //     this.data.dataOut = false;
    //   })
    //   .finally(() => this.data.close());
  }

  public cancel(): void {
    this.data.dataOut = false;
    this.data.close();
  }
}
