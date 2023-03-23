import { Component } from '@angular/core';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-browse-contact-point',
  templateUrl: './browse-contact-point.component.html',
  styleUrls: ['./browse-contact-point.component.scss'],
})
export class BrowseContactPointComponent {
  public sectionName = Entity.CONTACT_POINT;
}
