import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SectionsService } from 'src/services/sections.service';
import { SectionName } from 'src/utility/enums/sectionName.enum';
import { SectionItem } from 'src/utility/objects/login/sectionItem';
import { Sections } from 'src/utility/objects/login/sections';

@Component({
  selector: 'app-browse-distribution',
  templateUrl: './browse-distribution.component.html',
  styleUrls: ['./browse-distribution.component.scss'],
})
export class BrowseDistributionComponent implements OnInit {
  public displayedColumns: string[] = [];
  public dataSource!: MatTableDataSource<SectionItem>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private sectionsService: SectionsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.sectionsService.sectionsObservable
      .subscribe((sections: Array<Sections>) => {
        const dataProducts = sections.filter((item) => item.sectionName === SectionName.DISTRIBUTION);
        this.displayedColumns = dataProducts[0].columns.map((item) => item.columnLabel);
        this.dataSource = new MatTableDataSource(dataProducts[0].items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .add(() => (this.loading = false));
  }

  public formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  public rowClicked(row: SectionItem): void {
    this.router.navigate(['/browse/distributions/details', row.instanceId]);
  }
}
