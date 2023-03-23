import { Component } from '@angular/core';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-browse-distribution',
  templateUrl: './browse-distribution.component.html',
  styleUrls: ['./browse-distribution.component.scss'],
})
export class BrowseDistributionComponent {
  public sectionName = Entity.DISTRIBUTION;
}
