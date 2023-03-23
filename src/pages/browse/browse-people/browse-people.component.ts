import { Component } from '@angular/core';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-browse-people',
  templateUrl: './browse-people.component.html',
  styleUrls: ['./browse-people.component.scss'],
})
export class BrowsePeopleComponent {
  public sectionName = Entity.PERSON;
}
