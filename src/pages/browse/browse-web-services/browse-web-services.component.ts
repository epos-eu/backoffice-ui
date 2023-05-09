import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-browse-web-services',
  templateUrl: './browse-web-services.component.html',
  styleUrls: ['./browse-web-services.component.scss'],
})
export class BrowseWebServicesComponent {
  constructor(private router: Router) {}

  public sectionName = Entity.WEBSERVICE;

  public rowClicked(rowClickDetails: Array<string>): void {
    this.router.navigate(['/browse/web-services/details'].concat(rowClickDetails));
  }
}
