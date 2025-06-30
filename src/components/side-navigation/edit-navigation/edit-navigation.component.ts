import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject, combineLatest, filter, takeUntil } from 'rxjs';
import { Status } from 'src/utility/enums/status.enum';
import { ActionsService } from 'src/services/actions.service';
import { IChangeItem } from './edit.interface';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { Router } from '@angular/router';
import { StateChangeService } from 'src/services/stateChange.service';
import { HelpersService } from 'src/services/helpers.service';
import { DataProduct } from 'generated/backofficeSchemas';

@Component({
  selector: 'app-edit-navigation',
  templateUrl: './edit-navigation.component.html',
  styleUrls: ['./edit-navigation.component.scss'],
})
export class EditNavigationComponent implements OnInit, OnDestroy {
  private activeEntity?: Entity;
  private stop$ = new Subject<void>();
  public itemsExist = new BehaviorSubject<boolean>(false);
  public currentEdit!: IChangeItem;
  public status = Status;
  public formEdited = false;
  public activeDataProduct?: DataProduct | null;
  public disableSave = false;

  constructor(
    public dialog: MatDialog,
    public actionsService: ActionsService,
    private entityExecutionService: EntityExecutionService,
    private router: Router,
    private stateChangeService: StateChangeService,
    private helpersService: HelpersService,
  ) {}

  public ngOnInit(): void {
    this.actionsService.initEditedItems();
    this.initWatchers();
  }

  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  private initWatchers(): void {
    this.actionsService.currentEditObservable
      .pipe(
        filter((item): item is IChangeItem => !!item),
        takeUntil(this.stop$),
      )
      .subscribe((item: IChangeItem) => {
        this.currentEdit = item;
      });
    this.actionsService.editedItemsObservable.pipe(takeUntil(this.stop$)).subscribe((items) => {
      if (items.length > 0) {
        this.itemsExist.next(true);
      }
    });
    this.helpersService.activeEntityTypeObs
      .pipe(
        filter((activeEntityType): activeEntityType is Entity => !!activeEntityType),
        takeUntil(this.stop$),
      )
      .subscribe((activeEntityType: Entity) => {
        this.activeEntity = activeEntityType;
      });
    combineLatest([this.entityExecutionService.dataProductObs, this.actionsService.formEditedObs])
      .pipe(takeUntil(this.stop$))
      .subscribe(([dataProduct, formEdited]) => {
        this.activeDataProduct = dataProduct;
        this.formEdited = formEdited;
        this.disableSave = this.activeDataProduct?.status === Status.DRAFT && !this.formEdited;
      });
  }

  public handleSave(): void {
    switch (this.activeEntity as Entity) {
      case Entity.DATA_PRODUCT: {
        this.entityExecutionService.handleDataProductSave();
        break;
      }
      case Entity.DISTRIBUTION: {
        this.entityExecutionService.handleDistributionSave();
        break;
      }
      case Entity.WEBSERVICE: {
        this.entityExecutionService.handleWebserviceSave();
        break;
      }
    }
  }

  public handleCreateDataProductFromPublishedArchivedDiscardedEntity(): void {
    this.entityExecutionService.handleCreateDataProductFromPublishedArchivedDiscardedEntity();
  }

  public handleChangeState(status: Status) {
    if (this.activeEntity) {
      this.stateChangeService.handleStateChange(status, this.activeEntity);
    }
  }

  public isActive(id: string): boolean {
    return this.currentEdit && id === this.currentEdit.id;
  }

  public handleClick(id: string, route: EntityEndpointValue): void {
    this.router.navigate([`/browse/${route}/details`, id]);
  }
}
