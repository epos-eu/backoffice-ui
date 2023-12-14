import { Injectable } from '@angular/core';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { State } from 'src/utility/enums/state.enum';
import { SnackbarService } from './snackbar.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { EntityExecutionService } from './calls/entity-execution.service';
import { DialogService } from 'src/components/dialogs/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class StateChangeService {
  private triggerReload = new Subject<boolean>();
  public triggerReloadObs = this.triggerReload.asObservable();

  private currentDataProductState = new BehaviorSubject<State | null>(null);
  public currentDataProductStateObs = this.currentDataProductState.asObservable();

  constructor(
    private apiService: ApiService,
    private entityExecutionService: EntityExecutionService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
  ) {}

  public getCurrentDataProductState(): State | null {
    return this.currentDataProductState.getValue();
  }

  public setCurrentDataProductState(state: State): void {
    this.currentDataProductState.next(state);
  }

  public handleStateChange(state: State, entity: Entity) {
    let message = '';

    switch (state) {
      case State.SUBMITTED: {
        message = `Are you sure you'd like to Submit this draft?`;
        break;
      }
      case State.PUBLISHED: {
        message = `Are you sure you'd like to publish this submission?`;
        break;
      }
      case State.DISCARDED: {
        message = `Are you sure you'd like to discard this submission?`;
        break;
      }
      case State.ARCHIVED: {
        message = `Are you sure you'd like to archive this published instance?`;
        break;
      }
    }

    this.dialogService.openConfirmationDialog(message, false).then((accept: boolean) => {
      if (accept) {
        switch (entity) {
          case Entity.DATA_PRODUCT: {
            this.handleChangeDataProductState(
              this.entityExecutionService.getActiveDataProductValue()?.instanceId as string,
              state,
              true,
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

  private handleChangeDataProductState(instanceId: string, state: State, refresh = false) {
    let message = '';

    switch (state) {
      case State.SUBMITTED: {
        message = 'Draft submitted successfully';
        break;
      }
      case State.PUBLISHED: {
        message = 'Submission published successfully';
        break;
      }
      case State.DISCARDED: {
        message = 'Submission discarded successfully';
        break;
      }
      case State.ARCHIVED: {
        message = 'Published instance archived successfully';
        break;
      }
    }

    this.apiService.endpoints[Entity.DATA_PRODUCT].updateState
      .call({
        instanceId: instanceId,
        justThisOne: true,
        state: state,
      })
      .then(() => {
        // Temporariliy disabled until further clarity on how to implement.
        // this.actionsService.submitCurrentEdit(this.currentEdit.id);

        this.snackbarService.openSnackbar(message, 'Close', 'success', 5000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
        this.triggerReload.next(refresh);
      })
      .catch((err) => {
        console.error(err);
        this.snackbarService.openSnackbar(
          'Error changing the state of this Data Product, please try again later.',
          'Close',
          'error',
          5000,
          ['snackbar', 'mat-toolbar', 'snackbar-error'],
        );
      });
  }
}
