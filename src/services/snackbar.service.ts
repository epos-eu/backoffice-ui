import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackbar(
    title: string,
    action: string,
    success: boolean,
    duration?: number,
    panelClass?: Array<string>,
  ): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: duration ? duration : 5000,
      data: {
        title,
        action,
        success,
      },
      panelClass,
    });
  }
}
