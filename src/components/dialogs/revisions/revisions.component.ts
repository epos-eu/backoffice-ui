import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { DialogData } from '../baseDialogService.abstract';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';

interface CurrentEntity {
  metaId: string;
  type: Entity;
}

interface Revision {
  uid: string;
  version: string;
  created: Date;
  editorId: string;
}

@Component({
  selector: 'app-revisions',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.scss'],
})
export class RevisionsComponent implements OnInit {
  constructor(private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: DialogData<CurrentEntity>) {}

  public displayedColumns: string[] = ['uid', 'version', 'created', 'editorId'];
  public dataSource!: MatTableDataSource<Revision>;
  public pageSizeOptions = [10, 25, 50, 100];
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private _initTable(data: Array<Revision>): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getRelatedEntities(): void {
    const metaId = this.data.dataIn.metaId;

    switch (true) {
      case this.data.dataIn.type === Entity.DATA_PRODUCT:
        this.apiService.endpoints.DataProduct.getAll.call().then((data: Array<DataProductDetailDataSource>) => {
          const related = data.filter((item) => item.metaId === metaId);
          const versions: Revision[] = related.map((item) => {
            return {
              uid: item.uid,
              version: item.version,
              created: item.created,
              editorId: item.editorId,
            };
          });
          this.loading = false;
          this._initTable(versions);
        });
        break;
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.getRelatedEntities();
  }
}
