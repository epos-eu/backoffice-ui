import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-browse-organization',
  templateUrl: './browse-organization.component.html',
  styleUrls: ['./browse-organization.component.scss'],
})
export class BrowseOrganizationComponent {
  displayedColumns: string[] = ['uid', 'legalName'];
  // dataSource!: MatTableDataSource<OrganisationDataSource>;
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // constructor(private organisationService: OrganizationService, private router: Router) {}

  // TODO: add type for row
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}
