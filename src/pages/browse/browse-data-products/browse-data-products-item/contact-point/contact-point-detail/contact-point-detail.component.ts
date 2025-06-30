import { Component, Input, OnInit } from '@angular/core';
import { ContactPoint } from 'generated/backofficeSchemas';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Person } from 'src/apiAndObjects/objects/entities/person.model';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';
import { ContactPointRole } from 'src/utility/enums/contactPointRole.enum';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-contact-point-detail',
  templateUrl: './contact-point-detail.component.html',
  styleUrls: ['./contact-point-detail.component.scss'],
})
export class ContactPointDetailComponent implements OnInit {
  @Input() contactPointDetails!: Promise<ContactPoint[]>[];

  @Input() disabled = false;

  @Input() set newContact(contactPoint: ContactPoint | undefined) {
    if (contactPoint) {
      this.mergedDetails.push(contactPoint);
    }
  }

  constructor(
    private readonly snackbarService: SnackbarService,
    private readonly apiService: ApiService,
    private readonly dialogService: DialogService,
  ) {}

  private readonly contactPointArraySource: BehaviorSubject<Array<ContactPoint>> = new BehaviorSubject<
    Array<ContactPoint>
  >([]);

  public loading: boolean = true;

  // public person!: Person | undefined;

  public contactPointRoleOptions: Array<{ id: string; name: string }> = [];

  public mergedDetails: ContactPoint[] = [];

  public ngOnInit(): void {
    this.contactPointRoleOptions = Object.entries(ContactPointRole).map((e) => ({ name: e[1], id: e[0] }));
    Promise.all(this.contactPointDetails).then((contactPoints: ContactPoint[][]) => {
      const flattened = contactPoints.flat();
      this.mergedDetails = [...flattened];
      this.mergedDetails.forEach((item) => {
        // this.getPerson(item.person?.metaId, item.instanceId);
      });
      this.loading = false;
    });
  }

  private getPerson(metaId: string | undefined, instanceId: string | undefined): void {
    if (metaId && instanceId) {
      this.apiService.endpoints[Entity.PERSON].get
        .call(
          {
            metaId: metaId,
            instanceId: instanceId,
          },
          false,
        )
        .then((data: Array<Person>) => {
          if (Array.isArray(data) && data.length > 0) {
            // this.person = data.shift();
          }
        });
    }
  }

  public getRoleName(role: string | undefined) {
    if (role !== undefined) {
      const roleFiltered = this.contactPointRoleOptions.filter((e) => e.id === role);
      if (roleFiltered.length > 0) {
        return roleFiltered[0].name;
      }
    }
    return 'None';
  }

  public handleRemove(instanceId: string | undefined) {
    if (instanceId) {
      this.dialogService
        .handleDelete(instanceId, EntityEndpointValue.CONTACT_POINT, false)
        .then(() => {
          this.contactPointArraySource.next(
            this.contactPointArraySource.getValue().filter((obj) => obj.instanceId !== instanceId),
          );
          this.mergedDetails = this.mergedDetails.filter((obj) => obj.instanceId !== instanceId);
        })
        .catch((err) => {
          console.error(err);
          this.snackbarService.openSnackbar('Error deleting entity.', 'Close', SnackbarType.ERROR, 3000, [
            'snackbar',
            'mat-toolbar',
            'snackbar-error',
          ]);
        });
    }
  }

  public removeArrayDuplicates(arr: Array<string> | undefined): Array<string> {
    if (!arr) {
      return [];
    }
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
}
