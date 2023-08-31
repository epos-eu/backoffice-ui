import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-browse-contact-point',
  templateUrl: './browse-contact-point.component.html',
  styleUrls: ['./browse-contact-point.component.scss'],
})
export class BrowseContactPointComponent {
  public sectionName = Entity.CONTACT_POINT;
  constructor(private router: Router) {}

  public rowClicked(row: Record<string, string>): void {
    this.router.navigate([`/browse/${EntityEndpointValue.CONTACT_POINT}/details`, row['metaId'], row['instanceId']]);
  }

  public createContactPoint(): void {
    this.router.navigate([`browse/${EntityEndpointValue.CONTACT_POINT}/new`]);
  }
}
