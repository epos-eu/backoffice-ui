import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-browse-distribution',
  templateUrl: './browse-distribution.component.html',
  styleUrls: ['./browse-distribution.component.scss'],
})
export class BrowseDistributionComponent {
  public sectionName = Entity.DISTRIBUTION;
  constructor(private router: Router) {}

  public rowClicked(rowClickDetails: Array<string>): void {
    this.router.navigate(['/browse/distribution/details'].concat(rowClickDetails));
  }

  public createDataProduct(): void {
    this.router.navigate(['browse/distribution/new']);
  }
}
