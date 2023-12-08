import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { State } from 'src/utility/enums/state.enum';
import { ActionsService } from 'src/services/actions.service';
import { IChangeItem } from './edit.interface';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { UpdateService } from 'src/services/calls/update.service';
import { Router } from '@angular/router';
import { StateChangeService } from 'src/services/stateChange.service';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { HelpersService } from 'src/services/helpers.service';

@Component({
  selector: 'app-edit-navigation',
  templateUrl: './edit-navigation.component.html',
  styleUrls: ['./edit-navigation.component.scss'],
})
export class EditNavigationComponent implements OnInit {
  private activeEntity?: Entity;
  public itemsExist = new BehaviorSubject<boolean>(false);
  public currentEdit!: IChangeItem;
  public state = State;
  public formEdited = false;
  public activeDataProduct?: DataProduct | null;

  constructor(
    public dialog: MatDialog,
    public actionsService: ActionsService,
    private updateService: UpdateService,
    private router: Router,
    private stateChangeService: StateChangeService,
    private helpersService: HelpersService,
  ) {
    this.updateService.dataProductObs.subscribe((dp: DataProduct | null) => {
      this.activeDataProduct = dp;
    });
    this.helpersService.activeEntityTypeObs.subscribe((activeEntityType: Entity | null) => {
      if (null != activeEntityType) {
        this.activeEntity = activeEntityType;
      }
    });
  }

  ngOnInit(): void {
    this.actionsService.initEditedItems();
    this.checkForItems();
    this.trackEdit();
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
        this.updateService.handleDataProductSave();
        break;
      }
      case Entity.DISTRIBUTION: {
        this.updateService.handleDistributionSave();
        break;
      }
      case Entity.WEBSERVICE: {
        this.updateService.handleWebserviceSave();
        break;
      }
      case Entity.CONTACT_POINT: {
        this.updateService.handleContactPointSave();
        break;
      }
    }
  }

  public handleChangeState(state: State) {
    if (this.activeEntity) {
      this.stateChangeService.handleStateChange(state, this.activeEntity);
    }
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
