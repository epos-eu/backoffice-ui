import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { RevisionsDataSource } from 'src/apiAndObjects/objects/data-source/revisionsDataSource';
import { Entity } from 'src/utility/enums/entity.enum';
import { DialogData } from '../baseDialogService.abstract';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';

interface Revision {
  metaId: string;
}

@Component({
  selector: 'app-revisions',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.scss'],
})
export class RevisionsComponent implements OnInit {
  constructor(private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: DialogData<Revision>) {}

  public displayedColumns: string[] = ['uid', 'version', 'createdAt', 'createdBy'];
  public dataSource!: MatTableDataSource<RevisionsDataSource>;
  public pageSizeOptions = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    const metaId = this.data.dataIn.metaId;
    this.apiService.endpoints[Entity.DATA_PRODUCT].getAll.call().then((data: Array<DataProductDetailDataSource>) => {
      console.log(data.filter((item) => item.metaId === metaId));
    });
    // const obj = [
    //   {
    //     _sourceObject: {
    //       uid: '1',
    //       version: '4.0',
    //       createdAt: '11/07/2021',
    //       createdBy: 'John Smith',
    //     },
    //     id: '1',
    //     name: '4.0',
    //   },
    //   {
    //     _sourceObject: {
    //       uid: '2',
    //       version: '3.0',
    //       createdAt: '12/07/2021',
    //       createdBy: 'A Adams',
    //     },
    //     id: '2',
    //     name: '3.0',
    //   },
    //   {
    //     _sourceObject: {
    //       uid: '3',
    //       version: '2.0',
    //       createdAt: '12/07/2021',
    //       createdBy: 'A Adams',
    //     },
    //     id: '3',
    //     name: '2.0',
    //   },
    //   {
    //     _sourceObject: {
    //       uid: '4',
    //       version: '1.0',
    //       createdAt: '12/07/2021',
    //       createdBy: 'A Adams',
    //     },
    //     id: '4',
    //     name: '1.0',
    //   },
    // ];
    // this.dataSource = new MatTableDataSource(obj as unknown as RevisionsDataSource[]);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
}
