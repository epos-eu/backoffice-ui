import { Component } from '@angular/core';
import { SectionName } from 'src/utility/enums/sectionName.enum';

@Component({
  selector: 'app-browse-web-services',
  templateUrl: './browse-web-services.component.html',
  styleUrls: ['./browse-web-services.component.scss'],
})
export class BrowseWebServicesComponent {
  public sectionName = SectionName.WEBSERVICE;
}
