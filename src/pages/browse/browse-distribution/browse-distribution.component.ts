import { Component } from '@angular/core';
import { SectionName } from 'src/utility/enums/sectionName.enum';

@Component({
  selector: 'app-browse-distribution',
  templateUrl: './browse-distribution.component.html',
  styleUrls: ['./browse-distribution.component.scss'],
})
export class BrowseDistributionComponent {
  public sectionName = SectionName.DISTRIBUTION;
}
