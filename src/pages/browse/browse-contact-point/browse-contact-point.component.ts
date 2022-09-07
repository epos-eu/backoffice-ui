import { Component } from '@angular/core';
import { SectionName } from 'src/utility/enums/sectionName.enum';

@Component({
  selector: 'app-browse-contact-point',
  templateUrl: './browse-contact-point.component.html',
  styleUrls: ['./browse-contact-point.component.scss'],
})
export class BrowseContactPointComponent {
  public sectionName = SectionName.CONTACT_POINT;
}
