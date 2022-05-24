import { Component, OnInit } from '@angular/core';
import { Person } from 'src/api/models/entities/person.model';
import { initEmptyPersonObj } from 'src/helpers/person';

@Component({
  selector: 'app-dialog-add-person',
  templateUrl: './dialog-add-person.component.html',
  styleUrls: ['./dialog-add-person.component.scss'],
})
export class DialogAddPersonComponent implements OnInit {
  public data = [];
  public formFields: Person = initEmptyPersonObj();

  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      this.formFields = this.data.shift()!;
      console.log(this.formFields);
    }
  }
}
