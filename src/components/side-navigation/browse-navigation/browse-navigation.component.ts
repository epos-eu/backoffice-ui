import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { DialogNewDataproductComponent } from 'src/components/dialogs/dialog-new-dataproduct/dialog-new-dataproduct.component';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { ActionsService } from 'src/services/actions.service';
import { ActiveUserService } from 'src/services/activeUser.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { UserRole } from 'src/utility/enums/UserRole.enum';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { State } from 'src/utility/enums/state.enum';
import { UserBackofficeInfo } from 'src/utility/objects/userBackofficeInfo';
@Component({
  selector: 'app-browse-navigation',
  templateUrl: './browse-navigation.component.html',
  styleUrls: ['./browse-navigation.component.scss'],
})
export class BrowseNavigationComponent implements OnInit {
  public userInfo: UserBackofficeInfo | null = null;
  constructor(
    private router: Router,
    private activeUserService: ActiveUserService,
    private dialogService: DialogService,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
  ) {}

  ngOnInit(): void {
    this.activeUserService.activeUserInfoObservable.subscribe((userInfo: UserBackofficeInfo | null) => {
      this.userInfo = userInfo as UserBackofficeInfo;
    });
  }

  private handleCreate(): void {
    // this.loading = true;
    const item: DataProduct = {
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
      );
    // .finally(() => (this.loading = false));
  }

  public isAdmin(userRole: string): boolean {
    return userRole === UserRole.ADMIN;
  }

  public isReviewer(userRole: string): boolean {
    return userRole === UserRole.REVIEWER;
  }

  public isEditor(userRole: string): boolean {
    return userRole === UserRole.EDITOR;
  }

  public handleNewDataProduct(): void {
    this.dialogService
      .openDialogForComponent(DialogNewDataproductComponent, {}, 'new-dataproduct-dialog')
      .then((response) => {
        if (response.dataOut.create) {
          this.handleCreate();
        }
      });
  }
}
