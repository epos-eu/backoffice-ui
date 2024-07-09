import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataProduct, LinkedEntity, ContactPoint } from 'generated/backofficeSchemas';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { PersonDataSource } from 'src/apiAndObjects/objects/data-source/personDataSource';
import { SnackbarService } from 'src/services/snackbar.service';
import { StateChangeService } from 'src/services/stateChange.service';
import { ContactPointRole } from 'src/utility/enums/contactPointRole.enum';
import { Entity } from 'src/utility/enums/entity.enum';
import { Status } from 'src/utility/enums/status.enum';

@Component({
  selector: 'app-contact-point-search',
  templateUrl: './contact-point-search.component.html',
  styleUrl: './contact-point-search.component.scss',
})
export class ContactPointSearchComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private stateChangeService: StateChangeService,
  ) {}

  @Input() contactPointDetails: Array<LinkedEntity> | undefined = [];

  @Input() showSaveFormNotify = false;

  @Output() contactPointDetailsUpdated = new EventEmitter<Array<LinkedEntity>>();

  private contactPointArraySource: BehaviorSubject<Array<ContactPoint>> = new BehaviorSubject<Array<ContactPoint>>([]);

  public contactPointControl = new FormControl<string | PersonDataSource>('');

  public showContactPointForm = true;

  public loading = true;

  public personFromCatalogFilteredOptions!: Observable<PersonDataSource[]>;

  public contactPointRole = new FormControl<string>('');

  public contactPointRoleOptions: Array<{ id: string; name: string }> = [];

  public personFromCatalog: Array<PersonDataSource> = [];

  public disabled = false;

  private initData(): void {
    console.log(this.loading);
    if (this.contactPointDetails) {
      for (const item of this.contactPointDetails) {
        this.apiService.endpoints[Entity.CONTACT_POINT].get
          .call(
            {
              metaId: item.metaId as string,
              instanceId: item.instanceId as string,
            },
            false,
          )
          .then((data) => {
            console.log(data);
            if (Array.isArray(data) && data.length > 0) {
              const array = this.contactPointArraySource.getValue();
              array.push(data[0]);
              this.contactPointArraySource.next(array);
            }
          })
          .finally(() => {
            this.loading = false;
            console.log(this.loading);
          });
      }
    }
  }

  private createContactPoint(item: ContactPoint): void {
    this.apiService.endpoints.ContactPoint.create
      .call(item)
      .then((value: ContactPoint) => {
        const entityDetail: LinkedEntity = {
          entityType: Entity.CONTACT_POINT,
          instanceId: value.instanceId,
          uid: value.uid,
          metaId: value.metaId,
        };
        this.contactPointDetails?.push(entityDetail);

        // Send info to parent
        this.contactPointDetailsUpdated.emit(this.contactPointDetails);

        // Recall init form to retrieve new person information
        this.contactPointArraySource.next([]);
        this.initData();

        // Close edit format
        this.showContactPointForm = true;
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: Failed to add new contact point.`, 'close', 'error', 3000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      );
  }

  private _filter(name: string): PersonDataSource[] {
    const filterValue = name.toLowerCase();

    return this.personFromCatalog.filter(
      (option) =>
        (option.givenName.toLowerCase().includes(filterValue) ||
          option.familyName.toLowerCase().includes(filterValue) ||
          option.uid.toLowerCase().includes(filterValue)) &&
        option.state === Status.PUBLISHED,
    );
  }

  public ngOnInit(): void {
    this.contactPointRoleOptions = Object.entries(ContactPointRole).map((e) => ({ name: e[1], id: e[0] }));
    this.stateChangeService.currentDataProductStateObs.subscribe((state: DataProduct['status'] | null) => {
      if (state === null || state === Status.PUBLISHED || state === Status.ARCHIVED) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    });
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

    if (this.contactPointDetails && this.contactPointDetails.length > 0) {
      this.initData();
    }

    // remove loading cause contactPointDetails is empty
    if (this.contactPointDetails === null || this.contactPointDetails?.length === 0) {
      this.loading = false;
    }

    this.personFromCatalogFilteredOptions = this.contactPointControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.givenName;
        return name ? this._filter(name) : this.personFromCatalog.slice();
      }),
    );
  }

  public displayFn(user: PersonDataSource): string {
    return user?.givenName + ' ' + user.familyName + ' - ' + user.uid;
  }

  public saveContactPoint() {
    this.loading = true;
    const personDataSource = this.contactPointControl.value as PersonDataSource;

    const person: LinkedEntity = {
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

    // Save new contact point
    this.createContactPoint(item);
  }
}
