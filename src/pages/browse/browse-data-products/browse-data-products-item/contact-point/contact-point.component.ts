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

  @Input() contactPoint: Array<LinkedEntity> | undefined = undefined;
  @Input() showSaveFormNotify = false;
  @Input() relevantEntity?: Entity;

  private contactPointArraySource: BehaviorSubject<Array<ContactPoint>> = new BehaviorSubject<Array<ContactPoint>>([]);
  public entityEnum = Entity;
  public contactPointArrayObs = this.contactPointArraySource.asObservable();
  public personFromCatalogFilteredOptions!: Observable<any[]>;
  public contactPointDetails!: Promise<ContactPoint[]>[];

  private getContactPointDetails(): void {
    const requests: Promise<ContactPoint[]>[] = [];
    this.contactPoint?.forEach((item: LinkedEntity) => {
      requests.push(
        this.apiService.endpoints[Entity.CONTACT_POINT].get.call(
          {
            metaId: item.metaId as string,
            instanceId: item.instanceId as string,
          },
          false,
        ),
      );
    });
    this.contactPointDetails = requests;
  }

  public ngOnInit(): void {
    this.getContactPointDetails();
  }

  public updateContactPointArray(newContactPointDetails: Array<LinkedEntity>) {
    const dataProduct = this.entityExecutionService.getActiveDataProductValue();
    this.contactPoint = newContactPointDetails;
    if (null != dataProduct) {
      dataProduct.contactPoint = this.contactPoint;
      this.entityExecutionService.setActiveDataProduct(dataProduct);
    }
    this.showSaveFormNotify = true;
  }

  public removeContactPoint(instanceId: string | undefined) {
    if (instanceId) {
      this.apiService
        .deleteEntity(EntityEndpointValue.CONTACT_POINT, instanceId)
        .then(() => {
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
}
