import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouteService } from 'src/services/route.service';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit, OnDestroy {
  constructor(private routeService: RouteService, private router: Router) {}
  private subscription!: Subscription;
  private distributionVisited = false;

  private initRouteObs(): void {
    this.subscription = this.routeService.distributionAllVisitedObs.subscribe((visited: boolean) => {
      this.distributionVisited = visited;
    });
  }

  public ngOnInit(): void {
    this.initRouteObs();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public handleBack(): void {
    // if (this.distributionVisited === false) {
    //   this.router.navigate([`/browse/${EntityEndpointValue.DATA_PRODUCT}`]);
    // } else {
    //   this.router.navigate([`/browse/${EntityEndpointValue.DISTRIBUTION}`]);
    // }
    this.router.navigate([`/browse/${EntityEndpointValue.DISTRIBUTION}`]);
  }
}
