import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DistributionDataSource } from 'src/apiAndObjects/objects/distributionDataSource';

@Component({
  selector: 'app-browse-publications',
  templateUrl: './browse-publications.component.html',
  styleUrls: ['./browse-publications.component.scss'],
})
export class BrowsePublicationsComponent implements OnInit {
  public displayedColumns: string[] = ['uid', 'name', 'issued'];
  public dataSource!: MatTableDataSource<DistributionDataSource>;
  public pageSizeOptions = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.endpoints.distribution.getDistributions.call().then((data: Array<DistributionDataSource>) => {
      this.dataSource = new MatTableDataSource(data as Array<DistributionDataSource>);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
