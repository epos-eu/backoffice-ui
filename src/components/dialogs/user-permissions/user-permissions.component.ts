import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PermissionsDataSource } from 'src/apiAndObjects/objects/permissionsDataSource';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss'],
})
export class UserPermissionsComponent implements OnInit {
  public displayedColumns: string[] = ['group', 'permission'];
  public dataSource!: MatTableDataSource<PermissionsDataSource>;
  public pageSizeOptions = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    const obj = [
      {
        group: 'TCS Seismology',
        permission: 'Editor',
      },
    ];
    this.dataSource = new MatTableDataSource(obj as PermissionsDataSource[]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
