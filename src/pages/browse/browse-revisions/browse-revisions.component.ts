import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { Revision } from 'src/components/dialogs/revisions/revisions.component';
import { OperationsService } from 'src/services/operations.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import * as jsondiffpatch from 'jsondiffpatch';
import { State } from 'src/utility/enums/state.enum';

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
  ) {}

  public revisions: Array<Revision> = [];
  public entities: Array<DataProductDetailDataSource | undefined> = [];
  public visualDiff!: string | undefined;
  public loading = false;

  private _getCachedRevisions(): string | null {
    return this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.REVISIONS);
  }

  private _mapResponse(entity: DataProductDetailDataSource[]): DataProductDetailDataSource | undefined {
    const item = entity.shift();
    if (item) {
      const mapped = Object.fromEntries(Object.entries(item).filter(([key]) => key !== '_sourceObject'));
      return mapped as DataProductDetailDataSource;
    }
    return undefined;
  }

  private _fetchEntities(): void {
    this.loading = true;
    forkJoin([
      this.apiService.endpoints.DataProduct.get.call({
        instanceId: this.revisions[0].instanceId,
      }),
      this.apiService.endpoints.DataProduct.get.call({
        instanceId: this.revisions[1].instanceId,
      }),
    ]).subscribe((response: [DataProductDetailDataSource[], DataProductDetailDataSource[]]) => {
      this.entities = response.map(this._mapResponse);
      this.entities.sort((a) => (a?.state === State.PUBLISHED ? -1 : 1));
      console.log(this.entities);
      this.loading = false;
      this.visualDiff = this._getVisualDiff();
    });
  }

  private _getVisualDiff(): string | undefined {
    const delta = jsondiffpatch.diff(this.entities[0], this.entities[1]);
    if (delta) {
      const html = jsondiffpatch.formatters.html.format(delta, this.entities[0]);
      return html;
    }
    return undefined;
  }

  public ngOnInit(): void {
    if (this._getCachedRevisions()) {
      const parsed = JSON.parse(this._getCachedRevisions() as string);
      this.revisions = parsed;
      this._fetchEntities();
    } else {
      this.operationsService.revisionsObs.subscribe((revisions: Array<Revision>) => {
        this.revisions = revisions;
        this.persistorService.setValueInStorage(
          StorageType.LOCAL_STORAGE,
          StorageKey.REVISIONS,
          JSON.stringify(revisions),
        );
        this._fetchEntities();
      });
    }
  }
}
