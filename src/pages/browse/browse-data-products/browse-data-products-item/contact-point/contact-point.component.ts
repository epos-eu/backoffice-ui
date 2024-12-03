import { Component, Input, OnInit } from '@angular/core';
import { ContactPoint, DataProduct, LinkedEntity } from 'generated/backofficeSchemas';
import { get } from 'http';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { WithSubscription } from 'src/helpers/subscription';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { LoadingService } from 'src/services/loading.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';
import { StateChangeService } from 'src/services/stateChange.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { Status } from 'src/utility/enums/status.enum';

@Component({
  selector: 'app-contact-point',
  templateUrl: './contact-point.component.html',
  styleUrl: './contact-point.component.scss',
})
export class ContactPointComponent extends WithSubscription implements OnInit {
  constructor(
    private entityExecutionService: EntityExecutionService,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private stateChangeService: StateChangeService,
    private loadingService: LoadingService,
  ) {
    super();
  }

  @Input() contactPoint: Array<LinkedEntity> | undefined = undefined;

  public entityEnum = Entity;

  public contactPointDetails!: Promise<ContactPoint[]>[];

  public disabled = false;

  public newContact: ContactPoint | undefined;

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

  private initSubscriptions(): void {
    this.subscribe(this.stateChangeService.currentDataProductStateObs, (status: DataProduct['status'] | null) => {
      if (status === null || status === Status.PUBLISHED || status === Status.ARCHIVED) {
        this.disabled = true;
      }
    });
  }

  public ngOnInit(): void {
    this.initSubscriptions();
    this.getContactPointDetails();
  }

  public updateContactPointArray(newContactPointDetails: Array<LinkedEntity>) {
    const dataProduct = this.entityExecutionService.getActiveDataProductValue();
    this.contactPoint = newContactPointDetails;
    if (null != dataProduct) {
      dataProduct.contactPoint = this.contactPoint;
      this.entityExecutionService.setActiveDataProduct(dataProduct);
    }
  }

  public updateContactPointDetailWithNewContact(contact: LinkedEntity): void {
    this.apiService.endpoints.ContactPoint.get
      .call({
        instanceId: contact?.instanceId!,
        metaId: contact?.metaId!,
      })
      .then((contactDetail: ContactPoint[]) => {
        this.newContact = contactDetail.pop();
        this.snackbarService.openSnackbar(`Successfully added Contact.`, 'close', SnackbarType.SUCCESS, 3000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
      })
      .finally(() => {
        this.loadingService.setShowSpinner(false);
      });
  }
}
