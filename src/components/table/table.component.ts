import { AfterViewInit, Component, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { TableDetail } from 'src/utility/objects/table/detail';
import { TableItem, TableItems } from 'src/utility/objects/table/items';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  @Input() sectionName!: Entity;
  @Output() rowClickDetailsEmit = new Subject<Array<string>>();

  public displayedColumns = ['uid', 'lastChange', 'status', 'changeComment', 'author'];
  public dataSource!: MatTableDataSource<TableDetail>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService) {}

  public ngAfterViewInit(): void {
    this.loading = true;

    this.apiService.endpoints[this.sectionName].getAll.call().then((tableItems) => {
      this.createTableObjects(tableItems as TableItems);
    });
  }

  public rowClicked(instanceId: string): void {
    this.rowClickDetailsEmit.next(['/browse/data-products/details', instanceId]);
  }

  private createTableObjects(items: TableItems) {
    const tableDetails = new Array<TableDetail>();
    items.forEach((item: TableItem) => {
      console.log(item);
      const detail: TableDetail = {
        uid: item.uid,
        lastChange: item.changeTimestamp,
        status: item.state,
        changeComment: item.changeComment,
        author: item.editorId,
        instanceId: item.instanceId,
      };
      tableDetails.push(detail);
    });
    this.initialiseTable(tableDetails);
  }

  private initialiseTable(details: Array<TableDetail>) {
    this.dataSource = new MatTableDataSource(details);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }
}
