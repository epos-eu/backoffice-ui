import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Organization } from 'src/api/models/entities/organization.model';
import { OrganizationService } from 'src/services/organization.service';

@Component({
  selector: 'app-browse-organization',
  templateUrl: './browse-organization.component.html',
  styleUrls: ['./browse-organization.component.scss'],
})
export class BrowseOrganizationComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'legalName'];
  dataSource!: MatTableDataSource<Organization>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orgService: OrganizationService, private router: Router) {}

  ngOnInit(): void {
    this.orgService
      .getOrganizations()
      .then((response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response as Organization[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // TODO: add type for row
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowClicked(row: any) {
    this.router.navigate(['/browse/organization/details', row.identifier[0].identifier], { state: row });
  }
}
