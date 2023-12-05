import { Component, OnInit, ViewChild } from '@angular/core';
import { BarController, BarElement, Chart, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Router, NavigationEnd, Event as NavigationEvent, ActivationStart, RouterOutlet } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { ActionsService } from 'src/services/actions.service';
import { RouteService } from 'src/services/route.service';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  @ViewChild(RouterOutlet) outlet!: RouterOutlet;

  constructor(private router: Router, private actionsService: ActionsService, private routeService: RouteService) {
    this.router.events.subscribe((e) => {
      if (e instanceof ActivationStart) {
        this.outlet.deactivate();
      }
    });

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        pairwise(),
      )
      .subscribe(([prev, curr]: [NavigationEvent, NavigationEvent]) => {
        if (prev instanceof NavigationEnd && curr instanceof NavigationEnd) {
          /** The code block is checking the value of `prev.urlAfterRedirects` and based on that, it calls the
`distributionAllVisited()` method of the `routeService` with either `false` or `true` as an
argument. This triggers the @BackButtonComponent to return a user to either @BrowseDataProductsComponent or @BrowseDistributionsComponent **/

          if (prev.urlAfterRedirects === `/browse/${EntityEndpointValue.DATA_PRODUCT}`) {
            this.routeService.distributionAllVisited(false);
          } else if (prev.urlAfterRedirects === `/browse/${EntityEndpointValue.DISTRIBUTION}`) {
            this.routeService.distributionAllVisited(true);
          }

          this.routeService.setPreviousRoute(prev.urlAfterRedirects);
          if (prev.urlAfterRedirects !== curr.urlAfterRedirects) {
            this.actionsService.clearFilters();
          }
        }
      });
  }

  ngOnInit() {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
  }
}
