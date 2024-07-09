import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { DialogNewDataproductComponent } from 'src/components/dialogs/dialog-new-dataproduct/dialog-new-dataproduct.component';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { ActionsService } from 'src/services/actions.service';
import { EntityService } from 'src/services/entity.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-browse-distribution',
  templateUrl: './browse-distribution.component.html',
  styleUrls: ['./browse-distribution.component.scss'],
})
export class BrowseDistributionComponent {
  public sectionName = Entity.DISTRIBUTION;

  constructor(
    private router: Router,
    private entityService: EntityService,
    private dialogService: DialogService,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
  ) {}

  private handleCreate(): void {
    const item: DataProduct = {
      created: '',
    };

    this.apiService.endpoints.DataProduct.create
      .call(item)
      .then((value: DataProductDetailDataSource) => {
        this.router.navigate([`/browse/${EntityEndpointValue.DATA_PRODUCT}/details`, value.metaId, value.instanceId]);
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'close', 'success', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
        this.actionsService.saveCurrentEdit(value.instanceId);
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: failed to create new Data Product`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      );
  }

  public rowClicked(row: Record<string, unknown>): void {
    const dataProduct = row['dataProduct'] as EntityDetail;
    if (dataProduct) {
      this.entityService.setFocusedDistribution(row['instanceId'] as string);
      this.router.navigate([
        `/browse/${EntityEndpointValue.DATA_PRODUCT}/details`,
        dataProduct['metaId'],
        dataProduct['instanceId'],
      ]);
    }
  }

  public createAsset(): void {
    this.dialogService
      .openDialogForComponent(DialogNewDataproductComponent, {}, 'new-dataproduct-dialog')
      .then((response) => {
        if (response.dataOut.create) {
          this.handleCreate();
        }
      });
  }
}
