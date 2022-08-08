import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/apiAndObjects/api/api.service';

@Component({
  selector: 'app-browse-services',
  templateUrl: './browse-services.component.html',
  styleUrls: ['./browse-services.component.scss'],
})
export class BrowseServicesComponent {
  public displayedColumns: string[] = ['uid', 'name'];
  // public dataSource!: MatTableDataSource<ServiceDataSource>;
  public loading = false;
  public pageSizeOptions = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private apiService: ApiService) {}

  // ngOnInit(): void {
  //   this.loading = true;
  //   this.apiService.endpoints.services.getServices
  //     .call()
  //     .then((data: Array<ServiceDataSource>) => {
  //       this.dataSource = new MatTableDataSource(data as ServiceDataSource[]);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     })
  //     .finally(() => (this.loading = false));
  // }
}
