import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
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
}
