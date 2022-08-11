import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StatisticsDataSource } from 'src/apiAndObjects/objects/statisticsDataSource';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartConfig } from 'src/utility/config/chart';
import { table, groups } from './dummyData';
@Component({
  selector: 'app-browse-statistics',
  templateUrl: './browse-statistics.component.html',
  styleUrls: ['./browse-statistics.component.scss'],
})
export class BrowseStatisticsComponent implements OnInit {
  public displayedColumns: string[] = ['entity', 'published', 'submitted', 'draft'];
  public dataSource!: MatTableDataSource<StatisticsDataSource>;
  public pageSizeOptions = [10, 25, 50, 100];

  public options: ChartOptions = ChartConfig.OPTIONS;
  public groups!: Array<ChartData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.groups = groups;

    this.dataSource = new MatTableDataSource(table as StatisticsDataSource[]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
