import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { FacilitiesDataSource } from 'src/apiAndObjects/objects/facilitiesDataSource';

@Component({
  selector: 'app-browse-facilities',
  templateUrl: './browse-facilities.component.html',
  styleUrls: ['./browse-facilities.component.scss'],
})
export class BrowseFacilitiesComponent implements OnInit {
  public displayedColumns: string[] = ['uid', 'name'];
  public dataSource!: MatTableDataSource<FacilitiesDataSource>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.endpoints.facilities.getFacilities.call().then((data: Array<FacilitiesDataSource>) => {
      this.dataSource = new MatTableDataSource(data as Array<FacilitiesDataSource>);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
