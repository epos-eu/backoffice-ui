import { Component } from '@angular/core';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-browse-web-services',
  templateUrl: './browse-web-services.component.html',
  styleUrls: ['./browse-web-services.component.scss'],
})
export class BrowseWebServicesComponent {
  public sectionName = Entity.WEBSERVICE;
}
