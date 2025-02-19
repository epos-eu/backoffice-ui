import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DataProduct, LinkedEntity, ContactPoint } from 'generated/backofficeSchemas';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Person } from 'src/apiAndObjects/objects/entities/person.model';
import { WithSubscription } from 'src/helpers/subscription';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { LoadingService } from 'src/services/loading.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';
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
  @Input() contactPoint: Array<LinkedEntity> | undefined = [];

  @Output() contactPointDetailsUpdated = new EventEmitter<Array<LinkedEntity>>();

  @Output() newContact = new EventEmitter<ContactPoint>();

  @Output() isLoadingObs = new EventEmitter<boolean>();

  public form!: FormGroup;

  public personFilteredOptions!: Observable<Person[]>;

  public contactPointRoleOptions: Array<{ id: string; name: string }> = [];

  public person: Array<Person> = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly snackbarService: SnackbarService,
    private readonly stateChangeService: StateChangeService,
    private readonly formBuilder: FormBuilder,
    private readonly loadingService: LoadingService,
    private readonly entityExecutionService: EntityExecutionService,
  ) {
    super();
  }

  private initSubscriptions(): void {
    this.subscribe(this.stateChangeService.currentDataProductStateObs, (status: DataProduct['status'] | null) => {
      if (status === null || status === Status.PUBLISHED || status === Status.ARCHIVED) {
        this.form.disable();
      }
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      contactPoint: new FormControl(),
      role: new FormControl(this.contactPointRoleOptions[0].id),
    });
  }

  private trackFormChanges(): void {
    this.personFilteredOptions = this.form.valueChanges.pipe(
      map((changes) => changes['contactPoint']),
      map((name: string) => {
        if (typeof name === 'string') {
          return name ? this.filter(name) : this.person.slice();
        }
        return this.person.slice();
      }),
    );
  }

  private getPersonData(): void {
    this.isLoadingObs.emit(true);
    this.apiService.endpoints.Person.getAll
      .call()
      .then((person: Array<Person>) => {
        this.person = person;
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Failed to fetch Person data.`, 'close', SnackbarType.ERROR, 3000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      )
      .finally(() => this.isLoadingObs.emit(false));
  }

  public handleAddContactPoint(): void {
    if (this.form.get('contactPoint')?.value) {
      this.loadingService.setShowSpinner(true);
      const selectedPerson = this.form.get('contactPoint')?.value as Person;
      const personDetail: LinkedEntity = {
        entityType: Entity.PERSON,
        instanceId: selectedPerson.instanceId,
        uid: selectedPerson.uid,
        metaId: selectedPerson.metaId,
      };
      const newContactPoint: ContactPoint = {
        role: this.form.get('role') ? this.form.get('role')?.value : '',
        person: personDetail,
        email: selectedPerson.email,
      };

      this.apiService.endpoints.ContactPoint.create
        .call(newContactPoint)
        .then((item: LinkedEntity) => {
          if (null != item) {
            const entityDetail: LinkedEntity = {
              entityType: Entity.CONTACT_POINT,
              instanceId: item.instanceId,
              uid: item.uid,
              metaId: item.metaId,
            };
            this.newContact.emit(entityDetail);
            this.contactPointDetailsUpdated.emit(this.contactPoint);
            this.contactPoint?.push(entityDetail);
            this.form.reset();
            this.entityExecutionService.handleDataProductSave();
          }
        })
        .catch(() => {
          this.snackbarService.openSnackbar(`Failed to create Contact Point.`, 'close', SnackbarType.ERROR, 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
          this.loadingService.setShowSpinner(false);
        });
    }
  }

  private filter(name: string): Person[] {
    const filterValue = name.toLowerCase();
    return this.person.filter((option: Person) => {
      if (option.status === Status.PUBLISHED) {
        return (
          option.familyName?.toLowerCase().includes(filterValue) ||
          option.givenName?.toLowerCase().includes(filterValue)
        );
      }
      return false;
    });
  }

  public ngOnInit(): void {
    this.contactPointRoleOptions = Object.entries(ContactPointRole).map((e) => ({ name: e[1], id: e[0] }));
    this.initForm();
    this.initSubscriptions();
    this.trackFormChanges();
    this.getPersonData();
  }

  public displayFn(user: Person): string {
    const givenName = user?.givenName ? user.givenName : '';
    const familyName = user?.familyName ? user.familyName : '';
    const email = user?.email ? user.email[0] : '';
    return user ? `${givenName} ${familyName} - ${email}` : '';
  }

  public setAutocompleteValToForm(event: MatAutocompleteSelectedEvent): void {
    this.form.controls['contactPoint'].setValue(event.option.value);
  }
}
