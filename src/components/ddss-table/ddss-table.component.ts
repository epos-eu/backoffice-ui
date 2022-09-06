import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { SectionsService } from 'src/services/sections.service';
import { SectionItem } from 'src/utility/objects/login/sectionItem';
import { Sections } from 'src/utility/objects/login/sections';

@Component({
  selector: 'app-ddss-table',
  templateUrl: './ddss-table.component.html',
  styleUrls: ['./ddss-table.component.scss'],
})
export class DdssTableComponent implements OnInit {
  @Input() sectionName!: string;
  @Output() rowClickDetailsEmit = new Subject<Array<string>>();

  public displayedColumns = ['uid', 'lastChange', 'status', 'comment', 'author'];
  public dataSource!: MatTableDataSource<TableDetail>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sectionsService: SectionsService) {}

  public ngOnInit(): void {
    this.loading = true;
    this.sectionsService.sectionsObservable.subscribe((sections: Array<Sections>) => {
      this.createTableObjects(sections);
    });
  }

  public rowClicked(row: SectionItem): void {
    this.rowClickDetailsEmit.next(['/browse/data-products/details', row.instanceId]);
  }

  private createTableObjects(sections: Array<Sections>) {
    const tableDetails = new Array<TableDetail>();
    const dataProducts = sections.filter((item) => item.sectionName === this.sectionName).pop();
    if (dataProducts) {
      dataProducts.items.forEach((item: SectionItem) => {
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
