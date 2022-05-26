import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { OrganisationDataSource } from 'src/apiAndObjects/objects/organisationDataSource';

@Component({
  selector: 'app-browse-organization',
  templateUrl: './browse-organization.component.html',
  styleUrls: ['./browse-organization.component.scss'],
})
export class BrowseOrganizationComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'legalName'];
  dataSource!: MatTableDataSource<OrganisationDataSource>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.endpoints.organisation.getOrganisations
      .call()
      .then((response: OrganisationDataSource[]) => {
        this.dataSource = new MatTableDataSource(response as OrganisationDataSource[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((err) => console.error(err));
  }

  // TODO: add type for row
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowClicked(row: any) {
    this.router.navigate(['/browse/organization/details', row._sourceObject.identifier[0].identifier], {
      state: row._sourceObject,
    });
  }
}
