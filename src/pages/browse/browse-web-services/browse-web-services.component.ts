import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WebserviceDataSource } from 'src/apiAndObjects/objects/webserviceDataSource';
import { WebservicesService } from 'src/services/webservices.service';

@Component({
  selector: 'app-browse-web-services',
  templateUrl: './browse-web-services.component.html',
  styleUrls: ['./browse-web-services.component.scss'],
})
export class BrowseWebServicesComponent implements OnInit {
  public displayedColumns: string[] = ['uid', 'name'];
  public dataSource!: MatTableDataSource<WebserviceDataSource>;
  public pageSizeOptions = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private wService: WebservicesService, private router: Router) {}

  ngOnInit(): void {
    this.wService
      .getWebservices()
      .then((response: WebserviceDataSource[]) => {
        this.dataSource = new MatTableDataSource(response as WebserviceDataSource[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((err) => console.error(err));
  }

  // TODO: add type for row
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowClicked(row: any) {
    this.router.navigate(['/browse/web-services/details', '999472675'], { state: row._sourceObject });
  }
}
