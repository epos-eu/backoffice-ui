import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { ServiceDataSource } from 'src/apiAndObjects/objects/serviceDataSource';

@Component({
  selector: 'app-browse-services',
  templateUrl: './browse-services.component.html',
  styleUrls: ['./browse-services.component.scss'],
})
export class BrowseServicesComponent implements OnInit {
  public displayedColumns: string[] = ['uid', 'name'];
  public dataSource!: MatTableDataSource<ServiceDataSource>;
  public pageSizeOptions = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.endpoints.services.getServices.call().then((data: Array<ServiceDataSource>) => {
      this.dataSource = new MatTableDataSource(data as ServiceDataSource[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
