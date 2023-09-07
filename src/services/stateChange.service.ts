import { Injectable } from '@angular/core';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { State } from 'src/utility/enums/state.enum';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class StateChangeService {
  constructor(private apiService: ApiService, private snackbarService: SnackbarService) {}

  public handleChangeDataProductState(instanceId: string, state: State, refresh = false) {
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
        // this.actionsService.submitCurrentEdit(this.currentEdit.id);
        this.snackbarService.openSnackbar(message, 'Close', 'success', 5000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
        if (refresh) {
          location.reload();
        }
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
