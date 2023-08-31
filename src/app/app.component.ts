import { Component, OnInit, ViewChild } from '@angular/core';
import { BarController, BarElement, Chart, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Router, NavigationEnd, Event as NavigationEvent, ActivationStart, RouterOutlet } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { ActionsService } from 'src/services/actions.service';
import { RouteService } from 'src/services/route.service';

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
