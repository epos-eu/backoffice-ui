import { Component, OnInit } from '@angular/core';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import * as jsondiffpatch from 'jsondiffpatch';
import { ActivatedRoute } from '@angular/router';
import { HelpersService } from 'src/services/helpers.service';

@Component({
  selector: 'app-browse-revisions',
  templateUrl: './browse-revisions.component.html',
  styleUrls: ['./browse-revisions.component.scss'],
})
export class BrowseRevisionsComponent implements OnInit {
  constructor(
    private helpersService: HelpersService,
    private persistorService: PersistorService,
    private route: ActivatedRoute,
  ) {}

  public revisions: Array<DataProductDetailDataSource> = [];
  public entities: Array<DataProductDetailDataSource | undefined> = [];
  public visualDiff!: string | undefined;
  public loading = false;
  public error = false;
  public referrerId = '';

  private _getCachedRevisions(): string | null {
    return this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.REVISIONS);
  }

  private _mapResponse(revisions: DataProductDetailDataSource[]): void {
    const mapped = revisions.map((revision) =>
      Object.fromEntries(Object.entries(revision).filter(([key]) => key !== '_sourceObject')),
    ) as DataProductDetailDataSource[];
    this.revisions = mapped;
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

    const parsed = JSON.parse(this._getCachedRevisions() as string);

    if (Array.isArray(parsed) && parsed.length > 0) {
      this.revisions = JSON.parse(this._getCachedRevisions() as string);
      this._mapResponse(this.revisions);
      this.visualDiff = this._getVisualDiff();
    } else {
      this.helpersService.revisionsObs.subscribe((revisions: Array<DataProductDetailDataSource>) => {
        this.revisions = revisions;
        this._mapResponse(this.revisions);
        this.visualDiff = this._getVisualDiff();
        this.persistorService.setValueInStorage(
          StorageType.LOCAL_STORAGE,
          StorageKey.REVISIONS,
          JSON.stringify(revisions),
        );
      });
    }
  }
}
