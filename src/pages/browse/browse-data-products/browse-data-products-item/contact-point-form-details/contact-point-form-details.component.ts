import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
import { PersonDataSource } from 'src/apiAndObjects/objects/data-source/personDataSource';
import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { ActionsService } from 'src/services/actions.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { StateChangeService } from 'src/services/stateChange.service';
import { ContactPointRole } from 'src/utility/enums/contactPointRole.enum';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { State } from 'src/utility/enums/state.enum';

@Component({
  selector: 'app-contact-point-form-details',
  templateUrl: './contact-point-form-details.component.html',
  styleUrls: ['./contact-point-form-details.component.scss'],
})
export class ContactPointFormDetailsComponent implements OnInit {
  @Input() contactPointDetails: Array<EntityDetail> = [];
  @Input() showSaveFormNotify = false;
  @Input() relevantEntity?: Entity;
  @Output() contactPointDetailsUpdated = new EventEmitter<Array<EntityDetail>>();

  public disabled = false;
  public showContactPointForm = true;
  private contactPointArraySource: BehaviorSubject<Array<ContactPointDetailDataSource>> = new BehaviorSubject<
    Array<ContactPointDetailDataSource>
  >([]);
  public contactPointArrayObs = this.contactPointArraySource.asObservable();

  public contactPointController = new FormControl<string | PersonDataSource>('');
  public contactPointRole = new FormControl<string>('');
  public personFromCatalog: Array<PersonDataSource> = [];
  public personFromCatalogFilteredOptions!: Observable<PersonDataSource[]>;
  public contactPointRoleOptions: Array<{ id: string; name: string }> = [];

  public loading = true;
  public showFrom = false;

  public entityEnum = Entity;

  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
    private stateChangeService: StateChangeService,
  ) {
    this.contactPointRoleOptions = Object.entries(ContactPointRole).map((e) => ({ name: e[1], id: e[0] }));
    this.stateChangeService.currentDataProductStateObs.subscribe((state: State | null) => {
      if (state === null || state === State.PUBLISHED || state === State.ARCHIVED) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    });
  }

  ngOnInit(): void {
    this.apiService.endpoints.Person.getAll
      .call()
      .then((data: Array<PersonDataSource>) => {
        this.personFromCatalog = data;
        this.showContactPointForm = true;
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Failed to fetch contact point data.`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      );

    if (this.contactPointDetails.length > 0) {
      this.initData();
    }

    // remove loading cause contactPointDetails is empty
    if (this.contactPointDetails === null || this.contactPointDetails.length === 0) {
      this.loading = false;
    }

    this.personFromCatalogFilteredOptions = this.contactPointController.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.givenName;
        return name ? this._filter(name as string) : this.personFromCatalog.slice();
      }),
    );
  }

  private initData(): void {
    if (this.contactPointDetails !== null) {
      for (let i = 0; i < this.contactPointDetails.length; i++) {
        this.apiService.endpoints[Entity.CONTACT_POINT].get
          .call(
            {
              metaId: this.contactPointDetails[i].metaId,
              instanceId: this.contactPointDetails[i].instanceId,
            },
            false,
          )
          .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
              const array = this.contactPointArraySource.getValue();
              array.push(data[0]);
              this.contactPointArraySource.next(array);
            }
            this.loading = false;
          });
      }
    }
  }

  private _filter(name: string): PersonDataSource[] {
    const filterValue = name.toLowerCase();

    return this.personFromCatalog.filter(
      (option) =>
        (option.givenName.toLowerCase().includes(filterValue) ||
          option.familyName.toLowerCase().includes(filterValue) ||
          option.uid.toLowerCase().includes(filterValue)) &&
        option.state === State.PUBLISHED,
    );
  }

  public displayFn(user: PersonDataSource): string {
    return user && user.givenName ? user.givenName + ' ' + user.familyName + ' - ' + user.uid : '';
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

  public saveContactPoint() {
    this.loading = true;
    const personDataSource = this.contactPointController.value as PersonDataSource;

    const person: EntityDetail = {
      entityType: Entity.PERSON,
      instanceId: personDataSource.instanceId,
      uid: personDataSource.uid,
      metaId: personDataSource.metaId,
    };

    const item: ContactPoint = {
      uid: 'new contact point',
      person: person,
      role: this.contactPointRole.value as string,
    };

    // save new contact point
    this.apiService.endpoints.ContactPoint.create
      .call(item)
      .then((value: ContactPointDetailDataSource) => {
        const entityDetail: EntityDetail = {
          entityType: Entity.CONTACT_POINT,
          instanceId: value.instanceId,
          uid: value.uid,
          metaId: value.metaId,
        };
        this.contactPointDetails.push(entityDetail);

        // send info to parent
        this.contactPointDetailsUpdated.emit(this.contactPointDetails);

        // recall init form to retrieve new person information
        this.contactPointArraySource.next([]);
        this.initData();

        // close edit format
        this.showContactPointForm = true;

        if (this.relevantEntity === Entity.DATA_PRODUCT) {
          this.actionsService.enableSave();
        }
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: failed to add new Contact Point.`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      );
  }
}
