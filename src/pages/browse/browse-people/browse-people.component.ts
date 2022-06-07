import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { PeopleDataSource } from 'src/apiAndObjects/objects/peopleDataSource';

@Component({
  selector: 'app-browse-people',
  templateUrl: './browse-people.component.html',
  styleUrls: ['./browse-people.component.scss'],
})
export class BrowsePeopleComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.endpoints.people.getPeople.call().then((data: Array<PeopleDataSource>) => {
      console.debug(data);
    });
  }
}
