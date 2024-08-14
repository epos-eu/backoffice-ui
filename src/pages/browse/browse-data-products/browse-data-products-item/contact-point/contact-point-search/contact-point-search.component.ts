import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DataProduct, LinkedEntity, ContactPoint } from 'generated/backofficeSchemas';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Person } from 'src/apiAndObjects/objects/entities/person.model';
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
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  @Input() contactPoint: Array<LinkedEntity> | undefined = [];

  @Output() contactPointDetailsUpdated = new EventEmitter<Array<LinkedEntity>>();

  public form!: FormGroup;

  public loading = true;

  public personFilteredOptions!: Observable<Person[]>;

  public contactPointRoleOptions: Array<{ id: string; name: string }> = [];

  public person: Array<Person> = [];

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
    this.apiService.endpoints.Person.getAll
      .call()
      .then((person: Array<Person>) => {
        this.person = person;
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Failed to fetch contact point data.`, 'close', 'error', 3000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      );
  }

  public handleAddContactPoint(): void {
    if (this.form.get('contactPoint')?.value) {
      this.apiService.endpoints.ContactPoint.create
        .call(this.form.get('contactPoint')?.value)
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
        })
        .catch((err) => {
          this.snackbarService.openSnackbar(`Error: Failed to add new contact point.`, 'close', 'error', 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
          console.error(err);
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
    const uid = user?.uid ? user.uid : '';
    return givenName + ' ' + familyName + ' - ' + uid;
  }

  public setAutocompleteValToForm(event: MatAutocompleteSelectedEvent): void {
    this.form.controls['contactPoint'].setValue(event.option.value);
  }
}
