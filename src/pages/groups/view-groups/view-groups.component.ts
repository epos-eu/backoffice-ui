import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';

@Component({
  selector: 'app-view-groups',
  templateUrl: './view-groups.component.html',
  styleUrls: ['./view-groups.component.scss'],
})
export class ViewGroupsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns = ['name', 'description', 'id'];
  public dataSource!: MatTableDataSource<Group>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = true;

  constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    this.loading = true;
    this.apiService.endpoints.Group.getAll
      .call()
      .then((data: Array<Group>) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .finally(() => (this.loading = false));
  }
}
