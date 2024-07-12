import { Injectable } from '@angular/core';
import { Entity } from 'src/utility/enums/entity.enum';
import { Status } from 'src/utility/enums/status.enum';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SnackbarService } from '../snackbar.service';
import { LoadingService } from '../loading.service';
import { Location as LocationType } from 'generated/backofficeSchemas';

@Injectable({
  providedIn: 'root',
})
export class SpatialTemporalEntityExecutionService {
  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private loadingService: LoadingService,
  ) {}

  public handleSpatialSave(location: LocationType): void {
    if (location !== null) {
      if (location.status !== Status.DRAFT) {
        location.status = Status.DRAFT;
        location.instanceChangedId = location.instanceId;
      }
      this.loadingService.setShowSpinner(true);
      this.apiService.endpoints[Entity.LOCATION].update
        .call({
          ...location,
        })
        .then(() => {
          this.snackbarService.openSnackbar('Successfully saved Spatial Coverage.', 'Close', 'success', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-success',
          ]);
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar('Error updating Webservice.', 'Close', 'error', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        })
        .finally(() => {
          this.loadingService.setShowSpinner(false);
        });
    }
  }
}
