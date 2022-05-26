import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrganisationDataSource } from 'src/apiAndObjects/objects/organisationDataSource';
import { OrganizationService } from 'src/services/organization.service';

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

  constructor(private organisationService: OrganizationService, private router: Router) {}

  ngOnInit(): void {
    this.organisationService.getOrganizations().then((response: OrganisationDataSource[]) => {
      this.dataSource = new MatTableDataSource(response as OrganisationDataSource[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // TODO: add type for row
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowClicked(row: any) {
    this.router.navigate(['/browse/organization/details', row._sourceObject.identifier[0].identifier], {
      state: row._sourceObject,
    });
  }
}
