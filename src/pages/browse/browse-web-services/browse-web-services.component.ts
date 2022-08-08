import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-browse-web-services',
  templateUrl: './browse-web-services.component.html',
  styleUrls: ['./browse-web-services.component.scss'],
})
export class BrowseWebServicesComponent {
  public displayedColumns: string[] = ['uid', 'name', 'datePublished'];
  // public dataSource!: MatTableDataSource<WebserviceDataSource>;
  public pageSizeOptions = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // constructor() {}

  // ngOnInit(): void {

  // }

  // TODO: add type for row
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}
