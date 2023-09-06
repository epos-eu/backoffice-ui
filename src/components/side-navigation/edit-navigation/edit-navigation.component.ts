import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { State } from 'src/utility/enums/state.enum';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { ActionsService } from 'src/services/actions.service';
import { IChangeItem } from './edit.interface';
import { Entity } from 'src/utility/enums/entity.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { OperationsService } from 'src/services/operations.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';

@Component({
  selector: 'app-edit-navigation',
  templateUrl: './edit-navigation.component.html',
  styleUrls: ['./edit-navigation.component.scss'],
})
export class EditNavigationComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    private persistorService: PersistorService,
    public dialog: MatDialog,
    public actionsService: ActionsService,
    private operationsService: OperationsService,
    private router: Router,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
  ) {
    this.operationsService.dataProductObs.subscribe((dp: DataProduct | null) => {
      this.activeDataProduct = dp;
    });
  }

  private activeEntity = '';
  public itemsExist = new BehaviorSubject<boolean>(false);
  public currentEdit!: IChangeItem;
  public state = State;
  public formEdited = false;
  public activeDataProduct?: DataProduct | null;

  ngOnInit(): void {
    this.actionsService.initEditedItems();
    this.checkForItems();
    this.trackEdit();
    this.activeEntity = this.persistorService.getValueFromStorage(
      StorageType.LOCAL_STORAGE,
      StorageKey.ACTIVE_ENTITY,
    ) as Entity;
  }

  private trackEdit(): void {
    this.actionsService.currentEditObservable.subscribe((item: IChangeItem) => {
      if (item) {
        this.currentEdit = item;
      }
    });
    this.actionsService.formEditedObs.subscribe((formEdited: boolean) => {
      this.formEdited = formEdited;
    });
  }

  public handleSave(): void {
    switch (this.activeEntity as Entity) {
      case Entity.DATA_PRODUCT: {
        this.operationsService.handleDataProductSave();
        break;
      }
      case Entity.DISTRIBUTION: {
        this.operationsService.handleDistributionSave();
        break;
      }
      case Entity.WEBSERVICE: {
        this.operationsService.handleWebserviceSave();
        break;
      }
      case Entity.CONTACT_POINT: {
        this.operationsService.handleContactPointSave();
        break;
      }
    }
  }

  public handleSubmit(): void {
    const activeDataProduct = this.operationsService.getActiveDataProductValue();
    this.dialogService
      .openConfirmationDialog(`Are you sure you'd like to Submit this draft?`, false)
      .then((accept: boolean) => {
        if (accept) {
          this.handleChangeDataProductState(activeDataProduct?.instanceId as string, State.SUBMITTED, true);
        }
      });
  }

  public handlePublish(): void {
    const activeDataProduct = this.operationsService.getActiveDataProductValue();
    this.dialogService
      .openConfirmationDialog(`Are you sure you'd like to publish this submission?`, false)
      .then((accept: boolean) => {
        if (accept) {
          this.handleChangeDataProductState(activeDataProduct?.instanceId as string, State.PUBLISHED, true);
        }
      });
  }

  public handleDiscard(): void {
    const activeDataProduct = this.operationsService.getActiveDataProductValue();
    this.dialogService
      .openConfirmationDialog(`Are you sure you'd like to discard this submission?`, false)
      .then((accept: boolean) => {
        if (accept) {
          this.handleChangeDataProductState(activeDataProduct?.instanceId as string, State.DISCARDED, true);
        }
      });
  }

  public handleArchive(): void {
    const activeDataProduct = this.operationsService.getActiveDataProductValue();
    this.dialogService
      .openConfirmationDialog(`Are you sure you'd like to archive this published instance?`, false)
      .then((accept: boolean) => {
        if (accept) {
          this.handleChangeDataProductState(activeDataProduct?.instanceId as string, State.DISCARDED, true);
        }
      });
  }

  private handleChangeDataProductState(instanceId: string, state: State, refresh = false) {
    let message = '';

    switch (state) {
      case State.SUBMITTED: {
        message = 'Draft submitted successfully';
        break;
      }
      case State.PUBLISHED: {
        message = 'Submission published successfully';
        break;
      }
      case State.DISCARDED: {
        message = 'Submission discarded successfully';
        break;
      }
      case State.ARCHIVED: {
        message = 'Published instance archived successfully';
        break;
      }
    }

    this.apiService.endpoints[Entity.DATA_PRODUCT].updateState
      .call({
        instanceId: instanceId,
        justThisOne: true,
        state: state,
      })
      .then(() => {
        this.actionsService.submitCurrentEdit(this.currentEdit.id);
        this.snackbarService.openSnackbar(message, 'Close', 'success', 5000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
        if (refresh) {
          location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
        this.snackbarService.openSnackbar(
          'Error changing the state of this Data Product, please try again later.',
          'Close',
          'error',
          5000,
          ['snackbar', 'mat-toolbar', 'snackbar-error'],
        );
      });
  }

  public checkForItems(): void {
    this.actionsService.editedItemsObservable.subscribe((items) => {
      if (items.length > 0) {
        this.itemsExist.next(true);
      }
    });
  }

  public isActive(id: string): boolean {
    return this.currentEdit && id === this.currentEdit.id;
  }

  public handleClick(id: string, route: EntityEndpointValue): void {
    this.router.navigate([`/browse/${route}/details`, id]);
  }
}
