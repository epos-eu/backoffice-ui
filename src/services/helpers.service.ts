import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  public static formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
}
