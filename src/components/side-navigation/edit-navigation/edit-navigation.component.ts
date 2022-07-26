import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ActionsService } from 'src/services/actions.service';
import { IChangeItem } from './edit.interface';

@Component({
  selector: 'app-edit-navigation',
  templateUrl: './edit-navigation.component.html',
  styleUrls: ['./edit-navigation.component.scss'],
})
export class EditNavigationComponent implements OnInit {
  constructor(public actionsService: ActionsService, private router: Router) {}

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
    // Todo: save to DB
    this.actionsService.saveCurrentEdit(this.currentEdit.id);
  }

  public handleSubmit(): void {
    // Todo: save to DB
    this.actionsService.submitCurrentEdit(this.currentEdit.id);
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
}
