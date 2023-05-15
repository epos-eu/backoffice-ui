import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-browse-contact-point',
  templateUrl: './browse-contact-point.component.html',
  styleUrls: ['./browse-contact-point.component.scss'],
})
export class BrowseContactPointComponent {
  public sectionName = Entity.CONTACT_POINT;
  constructor(private router: Router) {}

  public rowClicked(rowClickDetails: Array<string>): void {
    this.router.navigate(['/browse/contact-point/details'].concat(rowClickDetails));
  }

  public createContactPoint(): void {
    this.router.navigate(['browse/contact-point/new']);
  }
}
