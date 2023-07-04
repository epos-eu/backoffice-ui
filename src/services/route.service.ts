import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private previousRoute = new BehaviorSubject<string>('');
  public previousRouteObs = this.previousRoute.asObservable();

  public setPreviousRoute(route: string): void {
    this.previousRoute.next(route);
  }
}
