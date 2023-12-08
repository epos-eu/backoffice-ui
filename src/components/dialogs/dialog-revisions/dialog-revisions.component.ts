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
import { UpdateService } from 'src/services/calls/update.service';
import { SelectionModel } from '@angular/cdk/collections';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { CUSTOM_DATE_FORMAT } from 'src/utility/config/date';
import * as moment from 'moment';
import { compareVersions } from 'compare-versions';
import { HelpersService } from 'src/services/helpers.service';

interface CurrentEntity {
  metaId: string;
  type: Entity;
  instanceId: string;
}

export interface Revision {
  instanceId: string;
  metaId: string;
  uid: string;
  version: string;
  state: State;
  created: Date | string;
  editorId: string;
  title: string;
}

@Component({
  selector: 'app-dialog-revisions',
  templateUrl: './dialog-revisions.component.html',
  styleUrls: ['./dialog-revisions.component.scss'],
})
export class DialogRevisionsComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData<CurrentEntity>,
    private router: Router,
    private dialogRef: MatDialogRef<DialogRevisionsComponent>,
    private helpersService: HelpersService,
  ) {}

  private revisions!: Array<Revision>;
  private entities!: Array<DataProductDetailDataSource>;
  public selection = new SelectionModel<Revision>(true, []);
  public displayedColumns: string[] = [
    'select',
    'instanceId',
    'uid',
    'version',
    'state',
    'created',
    'editorId',
    'link',
  ];
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
        this.apiService.endpoints.DataProduct.getAllVersions
          .call(
            {
              metaId: metaId,
            },
            false,
          )
          .then((data: Array<DataProductDetailDataSource>) => {
            this.entities = data;
            const revisions: Revision[] = data.map((item) => {
              return {
                instanceId: item.instanceId,
                metaId: item.metaId,
                uid: item.uid,
                version: item.versionInfo,
                state: item.state,
                created: moment(item.created).format(CUSTOM_DATE_FORMAT.display.dateInput),
                editorId: item.editorId,
                title: item.title[0],
              };
            });
            this.loading = false;
            this._initTable(revisions);
          });
        break;
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.getRelatedEntities();
  }

  public allSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.allSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  public handleNavigate(metaID: string, instanceId: string): void {
    this.router.navigate([`/browse/${EntityEndpointValue.DATA_PRODUCT}/details`, metaID, instanceId]);
    this.data.close();
  }

  public handleCompare(): void {
    const uids = this.selection.selected.map((item) => item.uid);
    const selectedRevisions = this.entities.filter((item) => uids.includes(item.uid));

    selectedRevisions.sort((a, b) => {
      if (a.versionInfo === '' || b.versionInfo === '') {
        return 1;
      }
      if (a.versionInfo !== '' && b.versionInfo !== '') {
        return compareVersions(a.versionInfo, b.versionInfo);
      }
      return 0;
    });

    this.dialogRef.close();
    this.router.navigate(['/browse/revisions/compare', this.data?.dataIn.instanceId]);
    this.helpersService.setRevisions(selectedRevisions);
  }
}
