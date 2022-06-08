import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { PeopleDataSource } from 'src/apiAndObjects/objects/peopleDataSource';

@Component({
  selector: 'app-browse-people',
  templateUrl: './browse-people.component.html',
  styleUrls: ['./browse-people.component.scss'],
})
export class BrowsePeopleComponent implements OnInit {
  public displayedColumns: string[] = ['uid', 'name'];
  public dataSource!: MatTableDataSource<PeopleDataSource>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.endpoints.people.getPeople.call().then((data: Array<PeopleDataSource>) => {
      this.dataSource = new MatTableDataSource(data as Array<PeopleDataSource>);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
