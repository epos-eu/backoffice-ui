import { Component } from '@angular/core';
import { SectionName } from 'src/utility/enums/sectionName.enum';

@Component({
  selector: 'app-browse-people',
  templateUrl: './browse-people.component.html',
  styleUrls: ['./browse-people.component.scss'],
})
export class BrowsePeopleComponent {
  public sectionName = SectionName.PERSON;
}
