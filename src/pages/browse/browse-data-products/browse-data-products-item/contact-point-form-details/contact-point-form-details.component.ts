import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { RevisionsComponent } from 'src/components/dialogs/revisions/revisions.component';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-contact-point-form-details',
  templateUrl: './contact-point-form-details.component.html',
  styleUrls: ['./contact-point-form-details.component.scss'],
})
export class ContactPointFormDetailsComponent implements OnInit {
  @Input() contactPointDetails: EntityDetail | undefined;

  public floatLabelControl = new UntypedFormControl('auto');
  public contactPoint!: ContactPointDetailDataSource | undefined;
  public entityRoute = EntityEndpointValue.CONTACT_POINT;

  constructor(private dialogService: DialogService, private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.contactPointDetails) {
      this.initData(this.contactPointDetails?.instanceId);
    }
  }

  private initData(id: string): void {
    this.apiService.endpoints[Entity.CONTACT_POINT].get
      .call(
        {
          instanceId: id,
        },
        false,
      )
      .then((data: Array<ContactPointDetailDataSource>) => {
        if (Array.isArray(data) && data.length > 0) {
          this.contactPoint = data.shift();
        }
      });
  }

  public handleGetRevisions(): void {
    // Todo: pass revisions data to component
    this.dialogService.openDialogForComponent(
      RevisionsComponent,
      {
        metaId: this.contactPoint?.metaId,
      },
      '35vw',
      'auto',
      'revisions-dialog',
    );
  }
}
