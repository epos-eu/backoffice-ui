import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { IndexDetailDataSource } from 'src/apiAndObjects/objects/indexDetailDataSource';
import { Sections } from 'src/utility/objects/login/sections';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  private sections = new BehaviorSubject<Array<Sections>>([]);
  public sectionsObservable = this.sections.asObservable();

  constructor(private apiService: ApiService) {}

  public setSections(sections: Array<Sections>): void {
    this.sections.next(sections);
  }

  // Forces API call disregrading any cached api call made prior.
  public forceSectionDataUpdate() {
    this.apiService.endpoints.index.getIndexDetails
      .call(undefined, false)
      .then((data: Array<IndexDetailDataSource>) => {
        this.setSections(data[0].sections as Array<Sections>);
      });
  }
}
