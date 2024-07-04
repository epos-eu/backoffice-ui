import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityFieldValue } from 'src/utility/enums/entityFieldValue.enum';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {}

  private dataProductActiveItem: BehaviorSubject<string> = new BehaviorSubject(
    EntityFieldValue.GENERAL_INFORMATION.valueOf(),
  );
  public dataProductActiveItemObs = this.dataProductActiveItem.asObservable();

  private dataProductActiveItemTitle: BehaviorSubject<string> = new BehaviorSubject('General Information');

  public dataProductActiveItemTitleObs = this.dataProductActiveItemTitle.asObservable();

  public setDataProductActiveItem(id: string): void {
    this.dataProductActiveItem.next(id);
  }

  public setDataProductActiveItemTitle(title: string): void {
    this.dataProductActiveItemTitle.next(title);
  }
}
