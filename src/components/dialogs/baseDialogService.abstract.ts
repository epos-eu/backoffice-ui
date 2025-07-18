import { ComponentType } from '@angular/cdk/portal';
import { inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { LogService } from 'src/services/log.service';

export abstract class BaseDialogService {
  private customBackdropCounts? = new Map<HTMLElement, number>();
  private customBackdrop: HTMLElement;
  private logger = inject(LogService);

  constructor(public dialog: MatDialog) {
    this.customBackdrop = document.createElement('div');
    this.customBackdrop.classList.add('dialog-custom-backdrop');
  }

  protected makeDialogData<DataInType, DataOutType>(
    id: string,
    closable = true,
    dataIn?: DataInType,
  ): DialogData<DataInType, DataOutType> {
    const data = {
      closable,
      requiresRefreshOnClose: false,
      close: () => {
        const dialogRef = this.dialog.getDialogById(id);
        if (null == dialogRef) {
          this.logger.warn(`Attempt to close non-existent dialog with id "${id}."`);
        } else {
          dialogRef.close(data);
        }
      },
      dataIn,
      dataOut: {},
    } as DialogData<DataInType, DataOutType>;
    return data;
  }

  protected openDialog<DataInType = unknown, DataOutType = unknown>(
    dialogId: string,
    contentComponent: ComponentType<unknown>,
    closable = true,
    customData?: DataInType,
    configIn: MatDialogConfig = {},
    backdropClass?: string,
    parentElement?: HTMLElement,
  ): Promise<DialogData<DataInType, DataOutType>> {
    // don't open if already open
    let dialogRef = this.dialog.getDialogById(dialogId);
    if (null != dialogRef) {
      console.warn('Dialog already open');
      return Promise.reject(new Error('Dialog already open'));
    } else {
      const dialogData = this.makeDialogData<DataInType, DataOutType>(dialogId, closable, customData);

      const config = {
        maxHeight: configIn?.height,
        maxWidth: configIn.width,
        panelClass: 'base-dialog',
        data: dialogData,
        id: dialogId,
        hasBackdrop: null == parentElement,
        backdropClass: backdropClass ? backdropClass : '',
        disableClose: !closable,
        ...configIn,
      };

      this.addCustomBackdrop(parentElement as HTMLElement);
      dialogRef = this.dialog.open(contentComponent, config);

      void lastValueFrom(dialogRef.afterClosed()).then(() => {
        if (null != parentElement) {
          this.tryRemoveCustomBackdrop(parentElement);
        }
      });
      return lastValueFrom(dialogRef.afterClosed()).then(() => dialogData);
    }
  }

  protected addCustomBackdrop(parentElement: HTMLElement): void {
    if (null != parentElement) {
      if (this.customBackdropCounts?.has(parentElement)) {
        this.customBackdropCounts.set(parentElement, this.customBackdropCounts.get(parentElement)! + 1);
      } else {
        this.customBackdropCounts?.set(parentElement, 1);
        parentElement.classList.add('dialog-custom-backdrop-wrapper');
        parentElement.appendChild(this.customBackdrop);
      }
    }
  }
  protected tryRemoveCustomBackdrop(parentElement: HTMLElement): void {
    if (null != parentElement && this.customBackdropCounts?.has(parentElement)) {
      this.customBackdropCounts.set(parentElement, this.customBackdropCounts.get(parentElement)! - 1);
      if (0 === this.customBackdropCounts.get(parentElement)) {
        this.customBackdropCounts.delete(parentElement);
        parentElement.classList.remove('dialog-custom-backdrop-wrapper');
        parentElement.removeChild(this.customBackdrop);
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DialogData<DataInType = any, DataOutType = any> {
  closable: boolean;
  requiresRefreshOnClose: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  close: (moreData?: object) => void;
  dataIn: DataInType;
  dataOut: DataOutType;
}
