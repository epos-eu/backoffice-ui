import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogAddContactComponent } from 'src/components/dialogs/dialog-add-contact/dialog-add-contact.component';
import { DialogAddPersonComponent } from 'src/components/dialogs/dialog-add-person/dialog-add-person.component';
import { DialogDeleteComponent } from 'src/components/dialogs/dialog-delete/dialog-delete.component';
import { DialogMetadataFileViewComponent } from 'src/components/dialogs/dialog-metadata-file-view/dialog-metadata-file-view.component';
import { TableUserDetail } from 'src/utility/objects/table/userDetail';
import { BaseDialogService, DialogData } from './baseDialogService.abstract';
import { DialogUserPermissionsComponent } from './dialog-user-permissions/dialog-user-permissions.component';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Router } from '@angular/router';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { ActionsService } from 'src/services/actions.service';
import { DialogWebserviceAddOperationComponent } from './dialog-webservice-add-operation/dialog-webservice-add-operation.component';
import { Operation } from 'src/apiAndObjects/objects/entities/operation.model';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { DialogAddNewParameterComponent } from './dialog-add-new-parameter/dialog-add-new-parameter.component';
import { DialogConfirmComponent, ConfirmationDataIn } from './dialog-confirm/dialog-confirm.component';
import { LoadingService } from 'src/services/loading.service';
import { DialogChangeCommentComponent } from './dialog-change-comment/dialog-change-comment.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService extends BaseDialogService {
  private dialogRef!: MatDialogRef<unknown>;
  private dialogState = new BehaviorSubject<string>('');
  public dialogStateObservable = this.dialogState.asObservable();

  constructor(
    public override dialog: MatDialog,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private actionsService: ActionsService,
    private loadingService: LoadingService,
  ) {
    super(dialog);
  }

  public setRef(ref: MatDialogRef<unknown>): void {
    this.dialogRef = ref;
  }

  public getRef(): MatDialogRef<unknown> {
    return this.dialogRef;
  }

  public closeDialog(): void {
    this.getRef().close();
  }

  public openDialogForComponent<T = unknown>(
    contentComponent: ComponentType<unknown>,
    data?: T,
    width = '35vw',
    height = 'auto',
    panelClass?: string,
  ): Promise<DialogData<T>> {
    return this.openDialog('anyDialog', contentComponent, true, data, {
      width,
      height,
      panelClass,
    });
  }

  public openConfirmationDialog(
    messageHtml = 'Confirm action',
    closable = false,
    confirmButtonHtml = 'OK',
    confirmButtonCssClass = 'confirm',
    cancelButtonHtml = 'Cancel',
  ): Promise<boolean> {
    return this.openDialog('confirm', DialogConfirmComponent, closable, {
      messageHtml: messageHtml,
      confirmButtonHtml: confirmButtonHtml,
      cancelButtonHtml: cancelButtonHtml,
      confirmButtonCssClass: confirmButtonCssClass,
    } as ConfirmationDataIn).then((data: DialogData<ConfirmationDataIn>) => {
      return null != data && data.dataOut;
    });
  }

  public openMetadataViewDialog(): Promise<DialogData> {
    return this.openDialog('metadataView', DialogMetadataFileViewComponent);
  }

  public openChangeUserRoleDialog(userData: TableUserDetail): Promise<DialogData> {
    return this.openDialog('changeUserRole', DialogUserPermissionsComponent, false, userData, {}, 'user-permissions');
  }

  public openAddNewParameterDialog(): Promise<DialogData> {
    return this.openDialog('changeUserRole', DialogAddNewParameterComponent, false, null, {}, 'user-permissions');
  }

  public handleDelete(instanceId: string, entityEndpoint: EntityEndpointValue, redirect = true): Promise<boolean> {
    return new Promise((resolve) => {
      this.openDialog('delete', DialogDeleteComponent, false, {})
        .then((response: DialogData) => {
          if (response.dataOut === 'delete') {
            this.loadingService.setShowSpinner(true);
            this.apiService
              .deleteEntity(entityEndpoint, instanceId)
              .then(() => {
                this.snackbarService.openSnackbar(
                  `Successfully deleted entity: ${instanceId}`,
                  'Close',
                  'success',
                  3000,
                  ['snackbar', 'mat-toolbar', 'snackbar-success'],
                );
                this.actionsService.deleteEditedItem(instanceId);

                if (redirect) {
                  this.router.navigate([`/browse/${entityEndpoint}`]);
                } else {
                  this.actionsService.triggerDataProductReload();
                }
                return resolve(true);
              })
              .catch((err) => {
                console.error(err);
                this.snackbarService.openSnackbar('Error deleting entity.', 'Close', 'error', 3000, [
                  'snackbar',
                  'mat-toolbar',
                  'snackbar-error',
                ]);
              })
              .finally(() => {
                this.loadingService.setShowSpinner(false);
              });
          } else {
            return resolve(false);
          }
        })
        .catch((err) => console.error(err));
    });
  }

  public handleAddContact(): void {
    this.openDialog(
      'addContact',
      DialogAddContactComponent,
      true,
      // initEmptyContactObj(),
    );
    this.dialogStateObservable.subscribe((result) => {
      // TODO: save form data into DB
      if (result) {
        // do stuff
      }
    });
  }

  public handleAddPerson(): void {
    this.openDialog(
      'addPerson',
      DialogAddPersonComponent,
      true,
      // initEmptyPersonObj(),
    );
    this.dialogStateObservable.subscribe((result) => {
      // TODO: save form data into DB
      if (result) {
        // do stuff
      }
    });
  }

  /**
   * The function `handleAddWebserviceOperation` opens a dialog to add a new webservice operation,
   * creates the operation using an API call, and returns a promise with the operation details.
   * @param {EntityDetail} webserviceEntityDetail - The `webserviceEntityDetail` parameter is an object
   * that contains details about a webservice entity. It is used as a parameter to open a dialog and also
   * passed as a property to the `WebserviceAddOperationComponent` component.
   * @returns a Promise that resolves to either an OperationDetailDataSource object or an unknown value.
   */
  public handleAddWebserviceOperation(
    webserviceEntityDetail: EntityDetail,
  ): Promise<OperationDetailDataSource | unknown> {
    const promise = new Promise((resolve) => {
      this.openDialog('addWebserviceOperation', DialogWebserviceAddOperationComponent, false, {
        webservice: webserviceEntityDetail,
      }).then((response: DialogData) => {
        if (response.dataOut.action === 'add') {
          this.loadingService.setShowSpinner(true);
          const item: Operation = {
            webservice: [webserviceEntityDetail],
          };

          this.apiService.endpoints.Operation.create
            .call(item)
            .then((value: OperationDetailDataSource) => {
              this.snackbarService.openSnackbar(`Success: Operation created`, 'close', 'success', 6000, [
                'snackbar',
                'mat-toolbar',
                'snackbar-success',
              ]);
              resolve(value);
            })
            .catch(() =>
              this.snackbarService.openSnackbar(`Error: failed to create new operation`, 'close', 'error', 6000, [
                'snackbar',
                'mat-toolbar',
                'snackbar-error',
              ]),
            )
            .finally(() => {
              this.loadingService.setShowSpinner(false);
            });
        }
      });
    });
    return promise;
  }

  public handleUpdateChangeComment(changeComment: string): Promise<DialogData> {
    return this.openDialog(
      'changeCommentDialog',
      DialogChangeCommentComponent,
      false,
      changeComment,
      {},
      'user-permissions',
    );
  }
}
