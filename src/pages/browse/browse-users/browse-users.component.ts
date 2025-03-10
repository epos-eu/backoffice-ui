import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Group, User } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DialogData } from 'src/components/dialogs/baseDialogService.abstract';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { UserRole } from 'src/utility/enums/UserRole.enum';
import { TableUserDetail } from 'src/utility/objects/table/userDetail';

@Component({
  selector: 'app-browse-users',
  templateUrl: './browse-users.component.html',
  styleUrls: ['./browse-users.component.scss'],
})
export class BrowseUsersComponent implements OnInit {
  public displayedColumns = ['name', 'surname', 'email', 'metaId', 'role'];
  public dataSource!: MatTableDataSource<TableUserDetail>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;
  public sectionName = Entity.USER;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly dialogService: DialogService, private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.initData();
  }

  public rowClicked(row: TableUserDetail & Group, statusType: string): void {
    const user: User = {
      firstName: row.name,
      lastName: row.surname,
      email: row.email,
      isAdmin: row.role === UserRole.ADMIN,
    };
    this.dialogService.openChangeUserRoleDialog({ user, group: null, statusType }).then((data: DialogData) => {
      if (data.dataOut) {
        this.initData();
      }
    });
  }

  private initData() {
    this.loading = true;
    this.apiService.endpoints[Entity.USER].getAll.call().then((users: Array<User>) => {
      this.createUserTableObjects(users);
    });
  }

  private createUserTableObjects(users: Array<User>) {
    const tableDetails = new Array<TableUserDetail>();
    if (users) {
      users.forEach((user: User) => {
        const detail: TableUserDetail = {
          name: user.firstName as string,
          surname: user.lastName as string,
          email: user.email as string,
          metaId: '',
          role: '',
          instanceId: '',
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
