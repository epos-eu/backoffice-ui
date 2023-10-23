import { Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { NewDataproductComponent } from 'src/components/dialogs/new-dataproduct/new-dataproduct.component';
import { scrollBackToTop } from 'src/helpers/scroll';
import { ActionsService } from 'src/services/actions.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { State } from 'src/utility/enums/state.enum';

@Component({
  selector: 'app-browse-data-products',
  templateUrl: './browse-data-products.component.html',
  styleUrls: ['./browse-data-products.component.scss'],
})
export class BrowseDataProductsComponent {
  @ViewChild(NgScrollbar) scrollable!: NgScrollbar;

  public sectionName = Entity.DATA_PRODUCT;
  public showButton = false;
  public loading = false;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
  ) {}

  private handleCreate(): void {
    this.loading = true;
    const item: DataProduct = {
      uid: 'temp-uid-to-be-generated',
      modified: new Date(),
      created: new Date(),
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
        this.actionsService.addEditedItems([
          {
            type: Entity.DATA_PRODUCT,
            route: EntityEndpointValue.DATA_PRODUCT,
            label: 'Data product',
            state: State.DRAFT,
            color: 'draft',
            id: value.instanceId,
          },
        ]);
        this.actionsService.saveCurrentEdit(value.instanceId);
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: failed to create new Data Product`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      )
      .finally(() => (this.loading = false));
  }

  public rowClicked(row: Record<string, string>): void {
    this.router.navigate([`/browse/${EntityEndpointValue.DATA_PRODUCT}/details`, row['metaId'], row['instanceId']]);
  }

  public handleScrollToTop(): void {
    scrollBackToTop(this.scrollable);
  }

  public handlePaginationChange(event: PageEvent): void {
    if (event.pageSize >= 25) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  public handleNewDataProduct(): void {
    this.dialogService
      .openDialogForComponent(NewDataproductComponent, {}, '35vw', 'auto', 'new-dataproduct-dialog')
      .then((response) => {
        if (response.dataOut.create) {
          this.handleCreate();
        }
      });
  }
}
