import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  private panelOpened = new BehaviorSubject<boolean>(false);
  public panelOpenedObs = this.panelOpened.asObservable();

  public handlePanelOpened(): void {
    this.panelOpened.next(true);
  }
}
