import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { State } from 'src/utility/enums/state.enum';
import { IChangeItem } from 'src/components/side-navigation/edit-navigation/edit.interface';
import { PersistorService, StorageType } from './persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  private liveChanges = new BehaviorSubject<boolean>(false);
  public liveChangesObservable = this.liveChanges.asObservable();

  private editedItems = new BehaviorSubject<Array<IChangeItem>>([]);
  public editedItemsObservable = this.editedItems.asObservable();

  private currentEdit = new ReplaySubject<IChangeItem>();
  public currentEditObservable = this.currentEdit.asObservable();

  private shouldClearFilters = new BehaviorSubject<boolean>(false);
  public shouldClearFiltersObs = this.shouldClearFilters.asObservable();

  private formEdited = new BehaviorSubject<boolean>(false);
  public formEditedObs = this.formEdited.asObservable();

  constructor(private persistorService: PersistorService) {}

  /**
   * Check if record being edited already exists.
   *
   * @param arr1 current edits
   * @param arr2 new edits(s)
   * @returns {Array} Existing record
   */
  private itemDiff = (arr1: Array<IChangeItem>, arr2: Array<IChangeItem>) => {
    if (arr1.length > 0) {
      return arr2.filter((prev) => arr1.find((curr) => prev['id'] === curr['id']));
    }
    return [];
  };

  /**
   * User has entered editing screen.
   */
  public setLiveEdit(): void {
    this.liveChanges.next(true);
  }

  /**
   * User has left editing screen.
   */
  public cancelLiveEdit(): void {
    this.liveChanges.next(false);
  }

  /**
   * Initialize editedItems array.
   */
  public initEditedItems(): void {
    if (this.getEditedItems().length > 0) {
      this.addEditedItems(this.getEditedItems());
    }
  }

  /**
   * Change status of current edit to 'Saved'.
   *
   * @param {number} id
   */
  public saveCurrentEdit(id: string): void {
    this.dispatchEditAction(id, State.DRAFT);
  }

  /**
   * Change status of current edit to 'Submitted'.
   *
   * @param {number} id
   */
  public submitCurrentEdit(id: string): void {
    this.dispatchEditAction(id, State.SUBMITTED);
  }

  public resetToDraft(id: string): void {
    this.dispatchEditAction(id, State.DRAFT);
  }

  public enableSave(): void {
    this.formEdited.next(true);
  }

  public disableSave(): void {
    this.formEdited.next(false);
  }

  /**
   * Dispatch save, submit, approve etc. actions
   *
   * @param {number} id
   * @param {string} type
   */
  public dispatchEditAction(id: string, type: State): void {
    const copy = [...this.editedItems.getValue()];
    const currentItem = copy.filter((item) => item.id === id);

    if (currentItem.length > 0) {
      const index = this.editedItems.getValue().findIndex((item) => item.id === id);
      const updated = copy[index];

      this.updateItem(index, {
        ...updated,
        state: type,
        color: type,
      });
    }
  }

  public initEdit(updatedItem: IChangeItem): void {
    this.currentEdit.next(updatedItem);
  }

  /**
   * Track the current edit.
   *
   * @param {string} id
   */
  public trackCurrentEdit(updatedItem: IChangeItem): void {
    const copy = [...this.editedItems.getValue()];
    const item = copy.find((obj) => obj === updatedItem);

    if (!item) {
      this.initEdit(updatedItem);
    } else {
      this.currentEdit.next(item);
    }
  }

  /**
   * Update item.
   */
  public updateItem(index: number, updatedItem: IChangeItem) {
    const items = this.editedItems.getValue();
    items[index] = updatedItem;
    this.persistorService.setValueInStorage(
      StorageType.LOCAL_STORAGE,
      StorageKey.ENTITY_CHANGES,
      JSON.stringify(items),
    );
    this.trackCurrentEdit(updatedItem);
  }

  /**
   * Get any previous edits saved in localStorage.
   *
   * @returns {Array}
   */
  public getEditedItems(): Array<IChangeItem> | [] {
    const editedItems = this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.ENTITY_CHANGES);
    if (editedItems != null) {
      return JSON.parse(editedItems);
    } else {
      return [];
    }
  }

  /**
   * Add new edited item to array, if it is not already present.
   *
   * @param items
   */
  public addEditedItems(items: Array<IChangeItem>): void {
    if (this.itemDiff(this.editedItems.getValue(), items).length > 0) {
      // Item already exists..
      console.log('Already tracking: ', this.itemDiff(this.editedItems.getValue(), items));
    } else {
      // Track new item being edited
      const merged = [...this.editedItems.getValue(), ...items];
      this.editedItems.next(merged);
      this.persistorService.setValueInStorage(
        StorageType.LOCAL_STORAGE,
        StorageKey.ENTITY_CHANGES,
        JSON.stringify(merged),
      );
    }
  }

  /**
   * checks if item exists in editedItems.
   */
  public itemExists(instanceId: string): boolean {
    return this.editedItems.getValue().some((item: IChangeItem) => item.id === instanceId);
  }

  /**
   * Remove item from editedItems.
   */
  public deleteEditedItem(instanceId: string): void {
    const originalEdits = this.editedItems.getValue();
    const newArray = originalEdits.filter((item: IChangeItem) => item.id !== instanceId);
    this.editedItems.next(newArray);
    this.persistorService.setValueInStorage(
      StorageType.LOCAL_STORAGE,
      StorageKey.ENTITY_CHANGES,
      JSON.stringify(newArray),
    );
  }

  /**
   * Remove all items from editedItems.
   */
  public clearAllItems(): void {
    this.editedItems.getValue().splice(0, this.editedItems.getValue().length);
    this.editedItems.next(this.editedItems.getValue());
  }

  public clearFilters(): void {
    this.shouldClearFilters.next(true);
  }
}
