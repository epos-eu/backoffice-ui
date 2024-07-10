import { Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { DialogNewDataproductComponent } from 'src/components/dialogs/dialog-new-dataproduct/dialog-new-dataproduct.component';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { scrollBackToTop } from 'src/helpers/scroll';
import { ActionsService } from 'src/services/actions.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { DataProduct } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';

@Component({
  selector: 'app-browse-data-products',
  templateUrl: './browse-data-products.component.html',
  styleUrls: ['./browse-data-products.component.scss'],
})
export class BrowseDataProductsComponent {
  @ViewChild(NgScrollbar) scrollable!: NgScrollbar;

  public sectionName = Entity.DATA_PRODUCT;
  public showButton = false;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private actionsService: ActionsService,
    private snackbarService: SnackbarService,
    private apiService: ApiService,
  ) {}

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

  public createAsset(): void {
    this.dialogService
      .openDialogForComponent(DialogNewDataproductComponent, {}, 'new-dataproduct-dialog')
      .then((response) => {
        if (response.dataOut.create) {
          this.handleCreate();
        }
      });
  }

  private handleCreate(): void {
    const item: DataProduct = {
      created: '',
    };

    this.apiService.endpoints.DataProduct.create
      .call(item)
      .then((value: DataProduct) => {
        this.router.navigate([`/browse/${EntityEndpointValue.DATA_PRODUCT}/details`, value.metaId, value.instanceId]);
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'close', 'success', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
        this.actionsService.saveCurrentEdit(value.instanceId as string);
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: failed to create new Data Product`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      );
  }
}
