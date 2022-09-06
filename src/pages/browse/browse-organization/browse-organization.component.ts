import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SectionName } from 'src/utility/enums/sectionName.enum';
import { SectionItem } from 'src/utility/objects/login/sectionItem';
@Component({
  selector: 'app-browse-organization',
  templateUrl: './browse-organization.component.html',
  styleUrls: ['./browse-organization.component.scss'],
})
export class BrowseOrganizationComponent {
  public sectionName = SectionName.ORGANIZATION;

  constructor(private router: Router) {}

  public rowClicked(row: SectionItem): void {
    this.router.navigate(['/browse/organization/details', row.instanceId]);
  }
}
