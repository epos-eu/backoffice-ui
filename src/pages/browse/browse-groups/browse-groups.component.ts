import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { groups } from './dummyData';
import { Group } from 'generated/backofficeSchemas';

@Component({
  selector: 'app-browse-groups',
  templateUrl: './browse-groups.component.html',
  styleUrls: ['./browse-groups.component.scss'],
})
export class BrowseGroupsComponent implements AfterViewInit {
  public displayedColumns: string[] = ['name', 'description'];
  public dataSource!: MatTableDataSource<Group>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(groups as Array<Group>);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
