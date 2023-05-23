import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { detailedDiff } from 'deep-object-diff';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { Revision } from 'src/components/dialogs/revisions/revisions.component';
import { OperationsService } from 'src/services/operations.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

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
  public entityDiff!: object | null;
  public loading = false;

  private _getCachedRevisions(): string | null {
    return this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.REVISIONS);
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
      this.entities = response.map((item) => item.shift());
      this.loading = false;
      this.entityDiff = this._getEntityDiff();
      console.log(this.entityDiff);
    });
  }

  private _getEntityDiff(): object | null {
    if (this.entities[0] && this.entities[1]) {
      const diff = detailedDiff(this.entities[0], this.entities[1]);
      Object.values(diff).map((item) => delete item._sourceObject);
      return diff;
    }
    return null;
  }

  ngOnInit(): void {
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

  public getChangesLength(changes: KeyValue<string, never>): number {
    return Object.keys(changes).length;
  }
}
