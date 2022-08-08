import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/apiAndObjects/api/api.service';

@Component({
  selector: 'app-browse-facilities',
  templateUrl: './browse-facilities.component.html',
  styleUrls: ['./browse-facilities.component.scss'],
})
export class BrowseFacilitiesComponent {
  public displayedColumns: string[] = ['uid', 'name'];
  // public dataSource!: MatTableDataSource<FacilitiesDataSource>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService) {}

  // ngOnInit(): void {
  // this.apiService.endpoints.facility.getFacilities.call().then((data: Array<FacilitiesDataSource>) => {
  //   this.dataSource = new MatTableDataSource(data as Array<FacilitiesDataSource>);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // });
  // }
}
