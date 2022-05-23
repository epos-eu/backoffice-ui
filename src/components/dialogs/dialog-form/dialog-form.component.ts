import { Component, OnInit } from '@angular/core';
import { Address } from 'src/api/models/types/address.type';
import { Identifier } from 'src/api/models/types/identifier.type';
import { initEmptyPersonObj } from 'src/helpers/person';

interface IDialogForm {
  address: Address;
  affiliation: Array<string>;
  cvurl: string;
  familyName: string;
  fileProvenance: string;
  givenName: string;
  identifier: Array<Identifier>;
  qualifications: Array<string>;
  email: Array<string>;
  telephone: Array<string>;
  uid: string;
}

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
})
export class DialogFormComponent implements OnInit {
  public data = [];
  public formFields: IDialogForm = initEmptyPersonObj();

  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      this.formFields = this.data.shift()!;
      console.log(this.formFields);
    }
  }
}
