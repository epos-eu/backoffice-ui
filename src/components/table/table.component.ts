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
import { CUSTOM_DATE_FORMAT } from 'src/utility/config/date';
import moment from 'moment';
import { Status } from 'src/utility/enums/status.enum';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  @Input() sectionName!: Entity;
  @Output() rowClickDetailsEmit = new Subject<Record<string, string>>();
  @Output() paginationChangeEmit = new EventEmitter<PageEvent>();

  public displayedColumns = ['title', 'changeComment', 'lastChange', 'status', 'author'];
  public dataSource!: MatTableDataSource<TableDetail>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, private readonly snackbarService: SnackbarService) {}

  private mapTableDetails(items: TableItems): TableDetail[] {
    return items.map((item: TableItem) => ({
      uid: item.uid,
      title: 'title' in item ? item.title : [''],
      lastChange: moment(item.changeTimestamp).format(CUSTOM_DATE_FORMAT.display.dateInput),
      status: item.status as Status,
      changeComment: item.changeComment,
      author: item.editorId,
      instanceId: item.instanceId as string,
      metaId: item.metaId as string,
      dataProduct: item instanceof DistributionDetailDataSource ? item.dataProduct?.[0] : undefined,
    }));
  }

  private filterDataSource(data: TableDetail, filterValue: string): boolean {
    const filters = JSON.parse(filterValue);
    const formatStr = (str: string) => str?.trim().toLocaleLowerCase();
    return (
      formatStr(data.status as string).indexOf(formatStr(filters.status)) >= 0 &&
      formatStr(data.title?.[0] as string)?.indexOf(formatStr(filters.title)) >= 0
    );
  }

  private createTableObjects(items: TableItems) {
    const tableDetails = this.mapTableDetails(items);
    this.initialiseTable(tableDetails);
  }

  private initialiseTable(details: Array<TableDetail>) {
    this.dataSource = new MatTableDataSource(details);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.filterDataSource;
    this.loading = false;
  }

  public ngAfterViewInit(): void {
    this.loading = true;
    this.apiService.endpoints[this.sectionName].getAll
      .call()
      .then((tableItems) => {
        this.createTableObjects(tableItems as TableItems);
      })
      .catch(() => {
        this.snackbarService.openSnackbar(
          `Failed to load data, please try again later.`,
          'close',
          SnackbarType.ERROR,
          6000,
          ['snackbar', 'mat-toolbar', 'snackbar-error'],
        );
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

  public handlePaginationChange(event: PageEvent): void {
    this.paginationChangeEmit.emit(event);
  }
}
