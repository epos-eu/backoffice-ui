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
  public displayedColumns = ['uid', 'lastChange', 'status', 'comment', 'author'];
  public dataSource!: MatTableDataSource<TableDetail>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private sectionsService: SectionsService) {}

  public ngOnInit(): void {
    this.loading = true;
    this.sectionsService.sectionsObservable.subscribe((sections: Array<Sections>) => {
      this.createTableObjects(sections);
    });
  }

  public rowClicked(row: SectionItem): void {
    this.router.navigate(['/browse/data-products/details', row.instanceId]);
  }

  private createTableObjects(sections: Array<Sections>) {
    const tableDetails = new Array<TableDetail>();
    const dataProducts = sections.filter((item) => item.sectionName === SectionName.DISTRIBUTION);
    if (dataProducts[0]) {
      dataProducts[0].items.forEach((item: SectionItem) => {
        const detail: TableDetail = {
          uid: item.cells[0].value,
          lastChange: item.cells[1].value,
          status: item.cells[2].value,
          comment: item.cells[3].value,
          author: item.cells[4].value,
        };
        tableDetails.push(detail);
      });
      this.initialiseTable(tableDetails);
    }
  }

  private initialiseTable(details: Array<TableDetail>) {
    this.dataSource = new MatTableDataSource(details);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }
}
interface TableDetail {
  uid: string;
  lastChange: string;
  status: string;
  comment: string;
  author: string;
}
