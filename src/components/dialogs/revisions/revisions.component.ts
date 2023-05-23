import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { DialogData } from '../baseDialogService.abstract';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { State } from 'src/utility/enums/state.enum';
import { Router } from '@angular/router';
import { OperationsService } from 'src/services/operations.service';

interface CurrentEntity {
  metaId: string;
  type: Entity;
}

export interface Revision {
  instanceId: string;
  uid: string;
  version: string;
  state: State;
  created: Date;
  editorId: string;
}

@Component({
  selector: 'app-revisions',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.scss'],
})
export class RevisionsComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData<CurrentEntity>,
    private router: Router,
    private dialogRef: MatDialogRef<RevisionsComponent>,
    private operationsService: OperationsService,
  ) {}

  private revisions!: Array<Revision>;
  public displayedColumns: string[] = ['instanceId', 'uid', 'version', 'state', 'created', 'editorId'];
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
          const revisions: Revision[] = related.map((item) => {
            return {
              instanceId: item.instanceId,
              uid: item.uid,
              version: item.version,
              state: item.state,
              created: item.created,
              editorId: item.editorId,
            };
          });
          this.loading = false;
          this._initTable(revisions);
          this.revisions = revisions;
        });
        break;
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.getRelatedEntities();
  }

  public rowClicked(instanceId: string): void {
    this.dialogRef.close();
    this.router.navigate(['/browse/revisions/compare', instanceId]);
    this.operationsService.setRevisions(this.revisions);
  }
}
