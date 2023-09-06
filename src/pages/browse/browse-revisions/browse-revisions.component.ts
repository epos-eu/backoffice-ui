import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { Revision } from 'src/components/dialogs/dialog-revisions/dialog-revisions.component';
import { OperationsService } from 'src/services/operations.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import * as jsondiffpatch from 'jsondiffpatch';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browse-revisions',
  templateUrl: './browse-revisions.component.html',
  styleUrls: ['./browse-revisions.component.scss'],
})
export class BrowseRevisionsComponent implements OnInit {
  constructor(
    private operationsService: OperationsService,
    private persistorService: PersistorService,
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {}

  public revisions: Array<unknown> = [];
  public entities: Array<DataProductDetailDataSource | undefined> = [];
  public visualDiff!: string | undefined;
  public loading = false;
  public error = false;
  public referrerId = '';

  private _getCachedRevisions(): string | null {
    return this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.REVISIONS);
  }

  private _mapResponse(entity: unknown[]): DataProductDetailDataSource | undefined {
    const item = entity.shift();
    if (item) {
      const mapped = Object.fromEntries(Object.entries(item).filter(([key]) => key !== '_sourceObject'));
      return mapped as DataProductDetailDataSource;
    }
    return undefined;
  }

  private _getVisualDiff(): string | undefined {
    const delta = jsondiffpatch.diff(this.revisions[0], this.revisions[1]);
    if (delta) {
      const html = jsondiffpatch.formatters.html.format(delta, this.entities[0]);
      return html;
    }
    return undefined;
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((obs) => {
      if (null != obs.get('id')) {
        this.referrerId = obs.get('id') as string;
      }
    });

    this.operationsService.revisionsObs.subscribe((revisions: Array<unknown>) => {
      this.revisions = revisions;
      console.log(this.revisions);
      // this._mapResponse(this.revisions);
      this.visualDiff = this._getVisualDiff();

      this.persistorService.setValueInStorage(
        StorageType.LOCAL_STORAGE,
        StorageKey.REVISIONS,
        JSON.stringify(revisions),
      );
    });
  }
}
