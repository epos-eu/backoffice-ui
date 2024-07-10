import { Component, Input, OnInit } from '@angular/core';
import { ContactPoint } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { ContactPointRole } from 'src/utility/enums/contactPointRole.enum';

@Component({
  selector: 'app-contact-point-detail',
  templateUrl: './contact-point-detail.component.html',
  styleUrls: ['./contact-point-detail.component.scss'],
})
export class ContactPointDetailComponent implements OnInit {
  @Input() contactPoint!: ContactPoint | undefined;

  public person!: any;

  public contactPointRoleOptions: Array<{ id: string; name: string }> = [];

  constructor(private apiService: ApiService) {
    this.contactPointRoleOptions = Object.entries(ContactPointRole).map((e) => ({ name: e[1], id: e[0] }));
  }

  ngOnInit(): void {
    if (this.contactPoint?.person?.instanceId !== undefined) {
      this.getPerson(this.contactPoint?.person.instanceId);
    }
  }

  private getPerson(id: string): void {
    //   this.apiService.endpoints[Entity.PERSON].get
    //     .call(
    //       {
    //         metaId: this.contactPoint?.metaId as string,
    //         instanceId: id,
    //       },
    //       false,
    //     )
    //     .then((data: Array<PersonDataSource>) => {
    //       if (Array.isArray(data) && data.length > 0) {
    //         this.person = data.shift();
    //       }
    //     });
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
