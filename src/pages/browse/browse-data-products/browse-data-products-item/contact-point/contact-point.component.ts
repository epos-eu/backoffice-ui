import { Component, Input } from '@angular/core';
import { ContactPoint, LinkedEntity } from 'generated/backofficeSchemas';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-contact-point',
  templateUrl: './contact-point.component.html',
  styleUrl: './contact-point.component.scss',
})
export class ContactPointComponent {
  constructor(
    private entityExecutionService: EntityExecutionService,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
  ) {}

  @Input() contactPointDetails: Array<LinkedEntity> | undefined = undefined;
  @Input() showSaveFormNotify = false;
  @Input() relevantEntity?: Entity;

  private contactPointArraySource: BehaviorSubject<Array<ContactPoint>> = new BehaviorSubject<Array<ContactPoint>>([]);
  public entityEnum = Entity;
  public contactPointArrayObs = this.contactPointArraySource.asObservable();
  public personFromCatalogFilteredOptions!: Observable<any[]>;
  // public loading = true;
  public showFrom = false;

  public updateContactPointArray(newContactPointDetails: Array<LinkedEntity>) {
    const dataProduct = this.entityExecutionService.getActiveDataProductValue();
    this.contactPointDetails = newContactPointDetails;
    if (null != dataProduct) {
      dataProduct.contactPoint = this.contactPointDetails;
      this.entityExecutionService.setActiveDataProduct(dataProduct);
    }
    // inform user that he has to save entire form
    this.showSaveFormNotify = true;
  }

  /**
   * The `removeContactPoint` function deletes a contact point entity from an array and displays an error
   * message if the deletion fails.
   * @param {string} instanceId - The `instanceId` parameter is a string that represents the unique
   * identifier of a contact point entity.
   */
  public removeContactPoint(instanceId: string) {
    this.apiService
      .deleteEntity(EntityEndpointValue.CONTACT_POINT, instanceId)
      .then(() => {
        // remove from array
        this.contactPointArraySource.next(
          this.contactPointArraySource.getValue().filter((obj) => obj.instanceId !== instanceId),
        );
      })
      .catch((err) => {
        console.error(err);
        this.snackbarService.openSnackbar('Error deleting entity.', 'Close', 'error', 3000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]);
      });
  }
}
