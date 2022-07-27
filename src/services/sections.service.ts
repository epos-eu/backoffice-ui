import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sections } from 'src/utility/objects/login/sections';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  private sections = new BehaviorSubject<Array<Sections>>([]);
  public sectionsObservable = this.sections.asObservable();

  public setSections(sections: Array<Sections>): void {
    this.sections.next(sections);
  }
}
