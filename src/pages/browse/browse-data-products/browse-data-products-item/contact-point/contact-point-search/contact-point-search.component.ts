import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataProduct, LinkedEntity, ContactPoint } from 'generated/backofficeSchemas';
import { Observable, map, startWith } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { WithSubscription } from 'src/helpers/subscription';
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
export class ContactPointSearchComponent extends WithSubscription implements OnInit {
  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private stateChangeService: StateChangeService,
  ) {
    super();
  }

  @Input() contactPoint: Array<LinkedEntity> | undefined = [];

  @Output() contactPointDetailsUpdated = new EventEmitter<Array<LinkedEntity>>();

  public contactPointControl = new FormControl<any>('');
  public showContactPointForm = true;
  public loading = true;
  public personFromCatalogFilteredOptions!: Observable<any[]>;
  public contactPointRole = new FormControl<string>('');
  public contactPointRoleOptions: Array<{ id: string; name: string }> = [];
  public personFromCatalog: Array<any> = [];
  public disabled = false;

  private initSubscriptions(): void {
    this.subscribe(this.stateChangeService.currentDataProductStateObs, (status: DataProduct['status'] | null) => {
      if (status === null || status === Status.PUBLISHED || status === Status.ARCHIVED) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    });
    this.personFromCatalogFilteredOptions = this.contactPointControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.givenName;
        return name ? this._filter(name) : this.personFromCatalog.slice();
      }),
    );
  }

  private initData(): void {
    // this.getContactPointDetails();
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
        this.contactPoint?.push(entityDetail);

        // Send info to parent
        this.contactPointDetailsUpdated.emit(this.contactPoint);

        // Recall init form to retrieve new person information
        // this.contactPointArraySource.next([]);
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

  private _filter(name: string): any[] {
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
    this.initSubscriptions();
    // this.apiService.endpoints.Person.getAll
    //   .call()
    //   .then((data: Array<any>) => {
    //     this.personFromCatalog = data;
    //     this.showContactPointForm = true;
    //   })
    //   .catch(() =>
    //     this.snackbarService.openSnackbar(`Failed to fetch contact point data.`, 'close', 'error', 6000, [
    //       'snackbar',
    //       'mat-toolbar',
    //       'snackbar-error',
    //     ]),
    //   );

    if (this.contactPoint && this.contactPoint.length > 0) {
      this.initData();
    } else {
      this.loading = false;
    }
  }

  public displayFn(user: any): string {
    return user?.givenName + ' ' + user.familyName + ' - ' + user.uid;
  }

  public saveContactPoint() {
    this.loading = true;
    const personDataSource = this.contactPointControl.value;

    const person: LinkedEntity = {
      // entityType: Entity.PERSON,
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
