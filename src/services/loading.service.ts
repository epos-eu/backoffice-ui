import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private showSpinner = new BehaviorSubject<boolean>(false);
  public showSpinnerObs = this.showSpinner.asObservable();

  public setShowSpinner(show: boolean): void {
    this.showSpinner.next(show);
  }
}
