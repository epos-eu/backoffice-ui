import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SetUserRoleParams } from 'src/apiAndObjects/api/user/setUserRole';
import { NewUserRoleDataSource } from 'src/apiAndObjects/objects/newUserRoleDataSource';
import { SnackbarService } from 'src/services/snackbar.service';
import { UserRole } from 'src/utility/enums/UserRole.enum';
import { SectionItem } from 'src/utility/objects/login/sectionItem';
import { DialogData } from '../baseDialogService.abstract';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss'],
})
export class UserPermissionsComponent implements OnInit {
  public displayedColumns = ['name', 'surname', 'email', 'role'];
  public userDetails?: ListObject;
  public userRole = UserRole;
  public currentRole = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData<SectionItem>,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    const dataProducts: SectionItem = this.data.dataIn as SectionItem;

    switch (dataProducts.cells[3].value as UserRole) {
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
      name: dataProducts.cells[0].value,
      surname: dataProducts.cells[1].value,
      email: dataProducts.cells[2].value,
      role: dataProducts.cells[3].value as UserRole,
    };
  }

  public setNewUserRole(currentRole: string): void {
    const params: SetUserRoleParams = {
      instanceId: this.data.dataIn.instanceId,
      role: currentRole as UserRole,
    };
    this.apiService.endpoints.user.setNewRole
      .call(params)
      .then((response: NewUserRoleDataSource) => {
        console.debug(response);
        this.snackbarService.openSnackbar(`User Successfully changed to ${currentRole}`, 'close', 'success');
      })
      .catch(() => this.snackbarService.openSnackbar(`Error: failed to change user role`, 'close', 'error'))
      .finally(() => this.data.close());
  }
}

interface ListObject {
  name: string;
  surname: string;
  email: string;
  role: UserRole;
}
