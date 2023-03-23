import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from 'src/utility/enums/entity.enum';
import { SectionItem } from 'src/utility/objects/login/sectionItem';
@Component({
  selector: 'app-browse-organization',
  templateUrl: './browse-organization.component.html',
  styleUrls: ['./browse-organization.component.scss'],
})
export class BrowseOrganizationComponent {
  public sectionName = Entity.ORGANIZATION;

  constructor(private router: Router) {}

  public rowClicked(row: SectionItem): void {
    this.router.navigate(['/browse/organization/details', row.instanceId]);
  }
}
