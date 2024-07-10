import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { DialogNewDataproductComponent } from 'src/components/dialogs/dialog-new-dataproduct/dialog-new-dataproduct.component';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { ActiveUserService } from 'src/services/activeUser.service';
import { LoadingService } from 'src/services/loading.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { UserRole } from 'src/utility/enums/UserRole.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { UserBackofficeInfo } from 'src/utility/objects/userBackofficeInfo';

@Component({
  selector: 'app-browse-navigation',
  templateUrl: './browse-navigation.component.html',
  styleUrls: ['./browse-navigation.component.scss'],
})
export class BrowseNavigationComponent implements OnInit {
  public userInfo: User | null = null;

  public loading$ = this.loadingService.loadingObs;

  constructor(
    private router: Router,
    private activeUserService: ActiveUserService,
    private dialogService: DialogService,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private loadingService: LoadingService,
  ) {}

  public ngOnInit(): void {
    this.activeUserService.activeUserInfoObservable.subscribe((userInfo: User | null) => {
      this.userInfo = userInfo;
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
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'View', 'success', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
      })
      .catch((err) => {
        console.error(err);
        this.snackbarService.openSnackbar(`Error: failed to create new Data Product`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]);
      });
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
