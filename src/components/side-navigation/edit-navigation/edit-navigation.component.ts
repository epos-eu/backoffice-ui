import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Status } from 'src/apiAndObjects/objects/enums/actions.enum';
import { DialogSubmitDraftComponent } from 'src/components/dialogs/dialog-submit-draft/dialog-submit-draft.component';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { ActionsService } from 'src/services/actions.service';
import { IChangeItem } from './edit.interface';
import { Entity } from 'src/utility/enums/entity.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { OperationsService } from 'src/services/operations.service';
import { Router } from '@angular/router';

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
    this.operationsService.handleDataProductSave();
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
    this.operationsService.handleWebserviceSave();
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
    this.operationsService.handleDistributionSave();
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
    this.operationsService.handleContactPointSave();
  }

  public handleClick(id: string, route: EntityEndpointValue): void {
    this.router.navigate([`/browse/${route}/details`, id]);
  }
}
