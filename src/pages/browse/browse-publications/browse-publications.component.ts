import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/apiAndObjects/api/api.service';

@Component({
  selector: 'app-browse-publications',
  templateUrl: './browse-publications.component.html',
  styleUrls: ['./browse-publications.component.scss'],
})
export class BrowsePublicationsComponent {
  public displayedColumns: string[] = ['uid', 'name', 'issued'];
  // public dataSource!: MatTableDataSource<DistributionDataSource>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private apiService: ApiService) {}

  // ngOnInit(): void {
  // this.apiService.endpoints.distribution.getDistributions.call().then((data: Array<DistributionDataSource>) => {
  //   this.dataSource = new MatTableDataSource(data as Array<DistributionDataSource>);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // });
  // }
}
