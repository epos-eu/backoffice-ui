import { Injectable } from '@angular/core';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { Status } from 'src/utility/enums/status.enum';
import { SnackbarService, SnackbarType } from './snackbar.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { EntityExecutionService } from './calls/entity-execution.service';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { Router } from '@angular/router';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { LoadingService } from './loading.service';
import { DataProduct } from 'generated/backofficeSchemas';

@Injectable({
  providedIn: 'root',
})
export class StateChangeService {
  private triggerReload = new Subject<boolean>();
  public triggerReloadObs = this.triggerReload.asObservable();

  private currentDataProductState = new BehaviorSubject<DataProduct['status'] | undefined>(undefined);
  public currentDataProductStateObs = this.currentDataProductState.asObservable();

  constructor(
    private apiService: ApiService,
    private entityExecutionService: EntityExecutionService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private loadingService: LoadingService,
  ) {}

  public getCurrentDataProductState(): DataProduct['status'] | null {
    return this.currentDataProductState.getValue();
  }

  public setCurrentDataProductState(state: DataProduct['status']): void {
    this.currentDataProductState.next(state);
  }

  public handleStateChange(state: DataProduct['status'], entity: Entity) {
    let message = '';

    switch (state) {
      case Status.SUBMITTED: {
        message = `Are you sure you'd like to Submit this draft?`;
        break;
      }
      case Status.PUBLISHED: {
        message = `Are you sure you'd like to publish this submission?`;
        break;
      }
      case Status.DISCARDED: {
        message = `Are you sure you'd like to reject this submission?`;
        break;
      }
      case Status.ARCHIVED: {
        message = `Are you sure you'd like to archive this published instance?`;
        break;
      }
      case Status.DRAFT: {
        message = `Are you sure you'd like to revert this discarded instance back to draft?`;
        break;
      }
    }

    this.dialogService.openConfirmationDialog(message, false).then((accept: boolean) => {
      if (accept) {
        this.loadingService.setShowSpinner(true);
        switch (entity) {
          case Entity.DATA_PRODUCT: {
            this.handleChangeDataProductState(
              this.entityExecutionService.getActiveDataProductValue()?.instanceId as string,
              state,
            );
            break;
          }
          case Entity.DISTRIBUTION: {
            break;
          }
          case Entity.WEBSERVICE: {
            break;
          }
        }
      }
    });
  }

  private handleChangeDataProductState(instanceId: string, state: DataProduct['status']) {
    let message = '';

    switch (state) {
      case Status.SUBMITTED: {
        message = 'Draft submitted successfully';
        break;
      }
      case Status.PUBLISHED: {
        message = 'Submission published successfully';
        break;
      }
      case Status.DISCARDED: {
        message = 'Submission discarded successfully';
        break;
      }
      case Status.ARCHIVED: {
        message = 'Published instance archived successfully';
        break;
      }
      case Status.DRAFT: {
        message = 'Reverted to Draft successfully';
        break;
      }
    }

    this.apiService.endpoints[Entity.DATA_PRODUCT].updateState
      .call({
        instanceId: instanceId,
        status: state,
      })
      .then(() => {
        window.location.reload();
        // this.router
        //   .navigate([
        //     `/browse/${EntityEndpointValue.DATA_PRODUCT}/details`,
        //     this.entityExecutionService.getActiveDataProductValue()?.metaId as string,
        //     this.entityExecutionService.getActiveDataProductValue()?.instanceId as string,
        //   ])
        //   .then(() => {
        //     this.snackbarService.openSnackbar(message, 'Close', 'success', 5000, [
        //       'snackbar',
        //       'mat-toolbar',
        //       'snackbar-success',
        //     ]);
        //   });
      })
      .catch((err) => {
        console.error(err);
        this.snackbarService.openSnackbar(
          'Error changing the state of this Data Product, please try again later.',
          'Close',
          SnackbarType.ERROR,
          5000,
          ['snackbar', 'mat-toolbar', 'snackbar-error'],
        );
      })
      .finally(() => {
        this.loadingService.setShowSpinner(false);
      });
  }
}
