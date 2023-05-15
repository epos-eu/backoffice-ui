import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GroupsDataSource } from 'src/apiAndObjects/objects/data-source/groupsDataSource';
import { groups } from './dummyData';

@Component({
  selector: 'app-browse-groups',
  templateUrl: './browse-groups.component.html',
  styleUrls: ['./browse-groups.component.scss'],
})
export class BrowseGroupsComponent implements AfterViewInit {
  public displayedColumns: string[] = ['name', 'description'];
  public dataSource!: MatTableDataSource<GroupsDataSource>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(groups as Array<GroupsDataSource>);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
