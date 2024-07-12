import { Component, Input, OnInit } from '@angular/core';
import { ContactPoint } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
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

  constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    this.contactPointRoleOptions = Object.entries(ContactPointRole).map((e) => ({ name: e[1], id: e[0] }));
    Promise.all(this.contactPointDetails).then((contactPoints: ContactPoint[][]) => {
      const flattened = contactPoints.flat();
      this.mergedDetails = [...flattened];
      this.mergedDetails.forEach((item) => {
        this.getPerson(item.metaId, item.instanceId);
      });
      this.loading = false;
    });
  }

  private getPerson(metaId: string, instanceId: string): void {
    this.apiService.endpoints[Entity.PERSON].get
      .call(
        {
          metaId: metaId,
          instanceId: instanceId,
        },
        false,
      )
      .then((data: Array<any>) => {
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
          this.person = data.shift();
        }
      });
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
