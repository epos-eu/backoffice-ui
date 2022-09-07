import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SetUserRoleParams } from 'src/apiAndObjects/api/user/setUserRole';
import { NewUserRoleDataSource } from 'src/apiAndObjects/objects/newUserRoleDataSource';
import { TableUserDetail } from 'src/pages/browse/browse-users/browse-users.component';
import { SnackbarService } from 'src/services/snackbar.service';
import { UserRole } from 'src/utility/enums/UserRole.enum';
import { DialogData } from '../baseDialogService.abstract';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss'],
})
export class UserPermissionsComponent implements OnInit {
  public userDetails?: ListObject;
  public userRole = UserRole;
  public currentRole = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData<TableUserDetail>,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    const dataProducts: TableUserDetail = this.data.dataIn as TableUserDetail;

    switch (dataProducts.role as UserRole) {
      case UserRole.ADMIN:
        this.currentRole = UserRole.ADMIN;
        break;
      case UserRole.EDITOR:
        this.currentRole = UserRole.EDITOR;
        break;
      case UserRole.REVIEWER:
        this.currentRole = UserRole.REVIEWER;
        break;
      case UserRole.VIEWER:
        this.currentRole = UserRole.VIEWER;
        break;
    }

    this.userDetails = {
      name: dataProducts.name,
      surname: dataProducts.surname,
      email: dataProducts.email,
      role: dataProducts.role as UserRole,
    };
  }

  public setNewUserRole(currentRole: string): void {
    const params: SetUserRoleParams = {
      instanceId: this.data.dataIn.instanceId,
      role: currentRole as UserRole,
    };
    this.apiService.endpoints.user.setNewRole
      .call(params)
      .then(() => {
        this.snackbarService.openSnackbar(`User Successfully changed to ${currentRole}`, 'close', 'success');
        this.data.dataOut = true;
      })
      .catch(() => {
        this.snackbarService.openSnackbar(`Error: failed to change user role`, 'close', 'error');
        this.data.dataOut = false;
      })
      .finally(() => this.data.close());
  }

  public cancel(): void {
    this.data.dataOut = false;
    this.data.close();
  }
}

interface ListObject {
  name: string;
  surname: string;
  email: string;
  role: UserRole;
}
