import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Status } from 'src/apiAndObjects/objects/enums/actions.enum';
import { DialogSubmitDraftComponent } from 'src/components/dialogs/dialog-submit-draft/dialog-submit-draft.component';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { ActionsService } from 'src/services/actions.service';
import { IChangeItem } from './edit.interface';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { State } from 'src/utility/enums/state.enum';
import { SnackbarService } from 'src/services/snackbar.service';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-edit-navigation',
  templateUrl: './edit-navigation.component.html',
  styleUrls: ['./edit-navigation.component.scss'],
})
export class EditNavigationComponent implements OnInit {
  constructor(
    private router: Router,
    private dialogService: DialogService,
    private apiService: ApiService,
    private persistorService: PersistorService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    public actionsService: ActionsService,
  ) {}

  private activeEntity = '';
  public itemsExist = new BehaviorSubject<boolean>(false);
  public currentEdit!: IChangeItem;

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
  }

  public handleSave(): void {
    switch (this.activeEntity as Entity) {
      case Entity.DATA_PRODUCT: {
        this.handleDataProductSave();
        break;
      }
      case Entity.DISTRIBUTION: {
        this.handleDistributionSave();
        break;
      }
      case Entity.WEBSERVICE: {
        this.handleWebserviceSave();
        break;
      }
      case Entity.CONTACT_POINT: {
        this.handleContactPointSave();
        break;
      }
    }
  }

  public handleSubmit(): void {
    const dialogRef = this.dialog.open(DialogSubmitDraftComponent, {
      width: '450px',
      height: '275px',
      panelClass: 'dialog-submit',
    });
    this.dialogService.setRef(dialogRef);
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

  private handleDataProductSave() {
    this.actionsService.addEditedItems([
      {
        type: Entity.DATA_PRODUCT,
        route: EntityEndpointValue.DATA_PRODUCT,
        label: 'Data product',
        status: Status.Draft,
        color: 'draft',
        id: this.currentEdit.id,
      },
    ]);
    this.actionsService.saveCurrentEdit(this.currentEdit.id);
    this.itemsExist.next(true);

    const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    if (localStorage !== null) {
      const formData: DataProduct = JSON.parse(localStorage);
      if (formData.state === State.DRAFT) {
        this.apiService.endpoints[Entity.DATA_PRODUCT].update
          .call({
            ...formData,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully updated draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
          })
          .catch((err) => {
            console.error(err);
            this.snackbarService.openSnackbar('Error updating draft.', 'Close', 'error', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-error',
            ]);
          });
      } else {
        this.apiService.endpoints[Entity.DATA_PRODUCT].create
          .call({
            ...formData,
            state: State.DRAFT,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
          })
          .catch((err) => {
            console.error(err);
            this.snackbarService.openSnackbar('Error creating new draft', 'Close', 'error', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-error',
            ]);
          });
      }
    }
  }

  private handleWebserviceSave() {
    this.actionsService.addEditedItems([
      {
        type: Entity.WEBSERVICE,
        route: EntityEndpointValue.WEBSERVICE,
        label: 'Webservice',
        status: Status.Draft,
        color: 'draft',
        id: this.currentEdit.id,
      },
    ]);
    this.actionsService.saveCurrentEdit(this.currentEdit.id);
    this.itemsExist.next(true);

    const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    if (localStorage !== null) {
      const formData: WebService = JSON.parse(localStorage);
      if (formData.state === State.DRAFT) {
        this.apiService.endpoints[Entity.WEBSERVICE].update
          .call({
            ...formData,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully updated draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
          })
          .catch((err) => {
            console.error(err);
            this.snackbarService.openSnackbar('Error updating draft.', 'Close', 'error', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-error',
            ]);
          });
      } else {
        this.apiService.endpoints.Webservice.create
          .call({
            ...formData,
            datePublished: new Date(),
            identifier: [],
            state: State.DRAFT,
            supportedOperation: [],
            temporalExtent: [],
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
          })
          .catch((err) => {
            console.error(err);
            this.snackbarService.openSnackbar('Error creating new draft', 'Close', 'error', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-error',
            ]);
          });
      }
    }
  }

  private handleDistributionSave() {
    this.actionsService.addEditedItems([
      {
        type: Entity.DISTRIBUTION,
        route: EntityEndpointValue.DISTRIBUTION,
        label: 'Distribution',
        status: Status.Draft,
        color: 'draft',
        id: this.currentEdit.id,
      },
    ]);
    this.actionsService.saveCurrentEdit(this.currentEdit.id);
    this.itemsExist.next(true);

    const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    if (localStorage !== null) {
      const formData: Distribution = JSON.parse(localStorage);
      if (formData.state === State.DRAFT) {
        this.apiService.endpoints[Entity.DISTRIBUTION].update
          .call({
            ...formData,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully updated draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
          })
          .catch((err) => {
            console.error(err);
            this.snackbarService.openSnackbar('Error updating draft.', 'Close', 'error', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-error',
            ]);
          });
      } else {
        console.debug('should be seting state');
        this.apiService.endpoints[Entity.DISTRIBUTION].create
          .call({
            ...formData,
            state: State.DRAFT,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
          })
          .catch((err) => {
            console.error(err);
            this.snackbarService.openSnackbar('Error creating new draft', 'Close', 'error', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-error',
            ]);
          });
      }
    }
  }

  private handleContactPointSave() {
    this.actionsService.addEditedItems([
      {
        type: Entity.CONTACT_POINT,
        route: EntityEndpointValue.CONTACT_POINT,
        label: 'Contact Point',
        status: Status.Draft,
        color: 'draft',
        id: this.currentEdit.id,
      },
    ]);
    this.actionsService.saveCurrentEdit(this.currentEdit.id);
    this.itemsExist.next(true);

    const localStorage = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA);
    if (localStorage !== null) {
      const formData: ContactPoint = JSON.parse(localStorage);
      if (formData.state === State.DRAFT) {
        this.apiService.endpoints[Entity.CONTACT_POINT].update
          .call({
            ...formData,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully updated draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
          })
          .catch((err) => {
            console.error(err);
            this.snackbarService.openSnackbar('Error updating draft.', 'Close', 'error', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-error',
            ]);
          });
      } else {
        console.debug('call here');
        this.apiService.endpoints[Entity.CONTACT_POINT].create
          .call({
            ...formData,
            state: State.DRAFT,
          })
          .then(() => {
            this.snackbarService.openSnackbar('Successfully created new draft.', 'Close', 'success', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-success',
            ]);
          })
          .catch((err) => {
            console.error(err);
            this.snackbarService.openSnackbar('Error creating new draft', 'Close', 'error', 3000, [
              'snackbar',
              'mat-toolbar',
              'snackbar-error',
            ]);
          });
      }
    }
  }

  public handleClick(id: string, route: EntityEndpointValue): void {
    this.router.navigate([`/browse/${route}/details`, id]);
  }
}
