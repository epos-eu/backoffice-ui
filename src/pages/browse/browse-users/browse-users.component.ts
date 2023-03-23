import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { UserInfoDataSource } from 'src/apiAndObjects/objects/userInfoDataSource';
import { DialogData } from 'src/components/dialogs/baseDialogService.abstract';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { TableUserDetail } from 'src/utility/objects/table/userDetail';

@Component({
  selector: 'app-browse-users',
  templateUrl: './browse-users.component.html',
  styleUrls: ['./browse-users.component.scss'],
})
export class BrowseUsersComponent implements OnInit {
  public displayedColumns = ['name', 'surname', 'email', 'role'];
  public dataSource!: MatTableDataSource<TableUserDetail>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialogService: DialogService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loading = true;
    this.apiService.endpoints[Entity.USER].getAll.call().then((users: Array<UserInfoDataSource>) => {
      this.createUserTableObjects(users);
    });
  }

  public rowClicked(row: TableUserDetail): void {
    this.dialogService.openChangeUserRoleDialog(row).then((data: DialogData) => {
      if (data.dataOut) {
        this.loading = true;
      }
    });
  }

  private createUserTableObjects(users: Array<UserInfoDataSource>) {
    const tableDetails = new Array<TableUserDetail>();
    if (users) {
      users.forEach((user: UserInfoDataSource) => {
        const detail: TableUserDetail = {
          name: user.firstName,
          surname: user.lastName,
          email: user.email,
          role: user.role,
          instanceId: user.instanceId,
        };
        tableDetails.push(detail);
      });
      this.initialiseUserTable(tableDetails);
    }
  }

  private initialiseUserTable(details: Array<TableUserDetail>) {
    this.dataSource = new MatTableDataSource(details);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }
}
