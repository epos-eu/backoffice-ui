import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { Entity } from 'src/utility/enums/entity.enum';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  public activeEntityType = new BehaviorSubject<Entity | null>(null);
  public activeEntityTypeObs = this.activeEntityType.asObservable();

  private revisions = new BehaviorSubject<Array<DataProductDetailDataSource>>([]);
  public revisionsObs = this.revisions.asObservable();

  public static formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  public static isValidDate(d: unknown) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  public static whiteSpaceReplace(str: string | undefined): string {
    if (str) {
      str = str.replace(/\s*,\s*/g, ', ');
      return str;
    }
    return '';
  }

  public setRevisions(revisions: Array<DataProductDetailDataSource>): void {
    this.revisions.next(revisions);
  }

  public clearDatePicker(control: AbstractControl): void {
    control.reset();
  }

  public isValidHttpUrl(urlToCheck: string) {
    let url;
    try {
      url = new URL(urlToCheck);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }
}
