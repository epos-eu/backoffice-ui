import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RevisionsDataSource } from 'src/apiAndObjects/objects/revisionsDataSource';

@Component({
  selector: 'app-revisions',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.scss'],
})
export class RevisionsComponent implements OnInit {
  public displayedColumns: string[] = ['uid', 'version', 'createdAt', 'createdBy'];
  public dataSource!: MatTableDataSource<RevisionsDataSource>;
  public pageSizeOptions = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    const obj = [
      {
        _sourceObject: {
          uid: '1',
          version: '4.0',
          createdAt: '11/07/2021',
          createdBy: 'John Smith',
        },
        id: '1',
        name: '4.0',
      },
      {
        _sourceObject: {
          uid: '2',
          version: '3.0',
          createdAt: '12/07/2021',
          createdBy: 'A Adams',
        },
        id: '2',
        name: '3.0',
      },
      {
        _sourceObject: {
          uid: '3',
          version: '2.0',
          createdAt: '12/07/2021',
          createdBy: 'A Adams',
        },
        id: '3',
        name: '2.0',
      },
      {
        _sourceObject: {
          uid: '4',
          version: '1.0',
          createdAt: '12/07/2021',
          createdBy: 'A Adams',
        },
        id: '4',
        name: '1.0',
      },
    ];
    this.dataSource = new MatTableDataSource(obj as unknown as RevisionsDataSource[]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
