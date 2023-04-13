import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Status } from 'src/apiAndObjects/objects/enums/actions.enum';
import { DialogSubmitDraftComponent } from 'src/components/dialogs/dialog-submit-draft/dialog-submit-draft.component';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { ActionsService } from 'src/services/actions.service';
import { IChangeItem } from './edit.interface';

@Component({
  selector: 'app-edit-navigation',
  templateUrl: './edit-navigation.component.html',
  styleUrls: ['./edit-navigation.component.scss'],
})
export class EditNavigationComponent implements OnInit {
  constructor(
    public actionsService: ActionsService,
    private router: Router,
    private dialogService: DialogService,
    public dialog: MatDialog,
  ) {}

  public itemsExist = new BehaviorSubject<boolean>(false);
  public currentEdit!: IChangeItem;

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
  }

  public handleSave(): void {
    this.actionsService.addEditedItems([
      {
        type: 'data-products',
        label: 'Data product',
        status: Status.Draft,
        color: 'draft',
        id: this.currentEdit.id,
      },
    ]);
    this.actionsService.saveCurrentEdit(this.currentEdit.id);
    this.itemsExist.next(true);
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
    if (this.currentEdit && id === this.currentEdit.id) {
      return true;
    }
    return false;
  }

  public handleClick(id: string): void {
    this.router.navigate(['/browse/data-products/details', id]);
  }
}
