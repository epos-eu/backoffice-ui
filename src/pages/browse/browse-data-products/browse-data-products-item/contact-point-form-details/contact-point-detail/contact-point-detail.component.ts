import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
import { PersonDataSource } from 'src/apiAndObjects/objects/data-source/personDataSource';
import { ContactPointRole } from 'src/utility/enums/contactPointRole.enum';
import { Entity } from 'src/utility/enums/entity.enum';

@Component({
  selector: 'app-contact-point-detail',
  templateUrl: './contact-point-detail.component.html',
  styleUrls: ['./contact-point-detail.component.scss'],
})
export class ContactPointDetailComponent implements OnInit {
  @Input() contactPoint!: ContactPointDetailDataSource | undefined;

  public person!: PersonDataSource | undefined;

  public contactPointRoleOptions: Array<{ id: string; name: string }> = [];

  constructor(private apiService: ApiService) {
    this.contactPointRoleOptions = Object.entries(ContactPointRole).map((e) => ({ name: e[1], id: e[0] }));
  }

  ngOnInit(): void {
    if (this.contactPoint?.person !== null && this.contactPoint?.person.instanceId !== undefined) {
      this.getPerson(this.contactPoint?.person.instanceId);
    }
  }

  private getPerson(id: string): void {
    this.apiService.endpoints[Entity.PERSON].get
      .call(
        {
          instanceId: id,
        },
        false,
      )
      .then((data: Array<PersonDataSource>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.person = data.shift();
          // console.debug(this.person);
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
