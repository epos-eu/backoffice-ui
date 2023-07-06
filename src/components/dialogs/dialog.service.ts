import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogAddContactComponent } from 'src/components/dialogs/dialog-add-contact/dialog-add-contact.component';
import { DialogAddPersonComponent } from 'src/components/dialogs/dialog-add-person/dialog-add-person.component';
import { DialogDeleteComponent } from 'src/components/dialogs/dialog-delete/dialog-delete.component';
import { MetadataFileViewComponent } from 'src/components/dialogs/metadata-file-view/metadata-file-view.component';
import { TableUserDetail } from 'src/utility/objects/table/userDetail';
import { BaseDialogService, DialogData } from './baseDialogService.abstract';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Router } from '@angular/router';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { ActionsService } from 'src/services/actions.service';
import { WebserviceAddOperationComponent } from './webservice-add-operation/webservice-add-operation.component';
import { Operation } from 'src/apiAndObjects/objects/entities/operation.model';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { DialogAddNewParameterComponent } from './dialog-add-new-parameter/dialog-add-new-parameter.component';

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
    width = '80vw',
    height = '80vh',
    panelClass?: string,
  ): Promise<DialogData<T>> {
    return this.openDialog('anyDialog', contentComponent, true, data, {
      width,
      height,
      panelClass,
    });
  }

  public openMetadataViewDialog(): Promise<DialogData> {
    return this.openDialog('metadataView', MetadataFileViewComponent);
  }

  public openLoginDialogComponent(): Promise<DialogData> {
    return this.openDialog(
      'loginCopmonent',
      DialogLoginComponent,
      false,
      null,
      {
        width: '40vw',
        height: 'auto',
      },
      'login-backdrop',
    );
  }

  public openChangeUserRoleDialog(userData: TableUserDetail): Promise<DialogData> {
    return this.openDialog(
      'changeUserRole',
      UserPermissionsComponent,
      false,
      userData,
      {
        width: '30vw',
        height: 'auto',
      },
      'user-permissions',
    );
  }

  public openAddNewParameterDialog(): Promise<DialogData> {
    return this.openDialog(
      'changeUserRole',
      DialogAddNewParameterComponent,
      false,
      null,
      {
        width: '30vw',
        height: 'auto',
      },
      'user-permissions',
    );
  }

  public handleDelete(instanceId: string, entityEndpoint: EntityEndpointValue): void {
    this.openDialog('delete', DialogDeleteComponent, false, {
      width: '450px',
      height: '275px',
    })
      .then((response: DialogData) => {
        if (response.dataOut === 'delete') {
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
              this.router.navigate([`/browse/${entityEndpoint}`]);
            })
            .catch((err) => {
              console.error(err);
              this.snackbarService.openSnackbar('Error deleting entity.', 'Close', 'error', 3000, [
                'snackbar',
                'mat-toolbar',
                'snackbar-error',
              ]);
            });
        }
      })
      .catch((err) => console.error(err));
  }

  public handleAddContact(): void {
    this.openDialog(
      'addContact',
      DialogAddContactComponent,
      true,
      {
        width: '700px',
        height: '650px',
      },
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
      {
        width: '700px',
        height: '700px',
      },
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
      this.openDialog('addWebserviceOperation', WebserviceAddOperationComponent, false, {
        width: '450px',
        height: '275px',
        webservice: webserviceEntityDetail,
      }).then((response: DialogData) => {
        if (response.dataOut.action === 'add') {
          const uid = response.dataOut.uid;

          if (uid !== '' && uid !== undefined) {
            const item: Operation = {
              uid: uid,
              webservice: [webserviceEntityDetail],
            };

            this.apiService.endpoints.Operation.create
              .call(item)
              .then((value: OperationDetailDataSource) => {
                this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'close', 'success', 6000, [
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
              );
          }
        }
      });
    });
    return promise;
  }
}
