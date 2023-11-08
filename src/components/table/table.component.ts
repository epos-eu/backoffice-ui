import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { TableDetail } from 'src/utility/objects/table/detail';
import { TableItem, TableItems } from 'src/utility/objects/table/items';
import { FilterEmit } from '../table-filter/table-filter.component';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { CUSTOM_DATE_FORMAT } from 'src/utility/config/date';
import * as moment from 'moment';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  @Input() sectionName!: Entity;
  @Output() rowClickDetailsEmit = new Subject<Record<string, string>>();
  @Output() paginationChangeEmit = new EventEmitter<PageEvent>();

  public displayedColumns = ['title', 'lastChange', 'status', 'versionInfo', 'author'];
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

  public rowClicked(row: Record<string, string>): void {
    this.rowClickDetailsEmit.next(row);
  }

  public handleFilter(filters: FilterEmit) {
    this.dataSource.filter = JSON.stringify(filters);
  }

  public handleClear(): void {
    if (null != this.dataSource) {
      this.dataSource.filter = '';
    }
  }

  private createTableObjects(items: TableItems) {
    const tableDetails = new Array<TableDetail>();
    items.forEach((item: TableItem) => {
      const detail: TableDetail = {
        uid: item.uid,
        title: '',
        lastChange: moment(item.changeTimestamp).format(CUSTOM_DATE_FORMAT.display.dateInput),
        status: item.state,
        changeComment: item.changeComment,
        versionInfo: item instanceof DataProductDetailDataSource ? item.versionInfo : '',
        author: item.editorId,
        instanceId: item.instanceId,
        metaId: item.metaId,
        dataProduct: item instanceof DistributionDetailDataSource ? item.dataProduct[0] : null,
      };

      if (item instanceof WebserviceDetailDataSource) {
        detail.title = item.name;
      } else if (item instanceof DataProductDetailDataSource || item instanceof DistributionDetailDataSource) {
        detail.title = item.title[0];
      } else {
        detail.title = '';
      }

      tableDetails.push(detail);
    });
    this.initialiseTable(tableDetails);
  }

  private initialiseTable(details: Array<TableDetail>) {
    this.dataSource = new MatTableDataSource(details);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: TableDetail, filterValue: string) => {
      const filters = JSON.parse(filterValue);
      return (
        data.status.trim().toLocaleLowerCase().indexOf(filters.status.trim().toLocaleLowerCase()) >= 0 &&
        data.title.trim().toLocaleLowerCase().indexOf(filters.title.trim().toLocaleLowerCase()) >= 0
      );
    };
    this.loading = false;
  }

  public handlePaginationChange(event: PageEvent): void {
    this.paginationChangeEmit.emit(event);
  }
}
