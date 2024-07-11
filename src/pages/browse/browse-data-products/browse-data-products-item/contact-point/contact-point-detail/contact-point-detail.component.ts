import { Component, Input, OnInit } from '@angular/core';
import { ContactPoint } from 'generated/backofficeSchemas';
import { ContactPointRole } from 'src/utility/enums/contactPointRole.enum';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-contact-point-detail',
  templateUrl: './contact-point-detail.component.html',
  styleUrls: ['./contact-point-detail.component.scss'],
})
export class ContactPointDetailComponent implements OnInit {
  @Input() contactPointDetails!: Promise<ContactPoint[]>[];

  public loading: boolean = true;

  public person!: any;

  public contactPointRoleOptions: Array<{ id: string; name: string }> = [];

  public mergedDetails: any[] = [];

  constructor() {
    this.contactPointRoleOptions = Object.entries(ContactPointRole).map((e) => ({ name: e[1], id: e[0] }));
  }

  public ngOnInit(): void {
    Promise.all(this.contactPointDetails).then((contactPoints: ContactPoint[][]) => {
      const flattened = contactPoints.flat();
      this.mergedDetails = [...flattened];
      this.loading = false;
    });
    // if (this.contactPoint?.person?.instanceId !== undefined) {
    //   this.getPerson(this.contactPoint?.person.instanceId);
    // }
  }

  private getPerson(id: string): void {
    // this.apiService.endpoints[Entity.PERSON].get
    //   .call(
    //     {
    //       metaId: this.contactPoint?.metaId as string,
    //       instanceId: id,
    //     },
    //     false,
    //   )
    //   .then((data: Array<Person>) => {
    //     if (Array.isArray(data) && data.length > 0) {
    //       this.person = data.shift();
    //     }
    //   });
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
}
