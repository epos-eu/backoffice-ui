import { Component } from '@angular/core';
import { MatDialogState } from '@angular/material/dialog';
import { AaaiService } from 'src/aaai/aaai.service';
import { AAAIUser } from 'src/aaai/aaaiUser.interface';
import { DialogService } from 'src/components/dialogs/dialog.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private dialogService: DialogService, private aaai: AaaiService) {
    this.aaai.watchUser().subscribe((user: AAAIUser | null) => {
      if (null == user) {
        // Prevent app erroring from trying to open same dialog twice
        if (this.dialogService.dialog.getDialogById('loginCopmonent')?.getState() !== MatDialogState.OPEN) {
          this.dialogService.openLoginDialogComponent();
        }
      } else if (
        null != user &&
        this.dialogService.dialog.getDialogById('loginCopmonent')?.getState() === MatDialogState.OPEN
      ) {
        this.dialogService.dialog.getDialogById('loginCopmonent')?.close();
      }
    });
  }
}
