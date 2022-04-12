import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Organization } from '../../../../api/models/entities/organization.model';

@Component({
  selector: 'app-browse-organization-item',
  templateUrl: './browse-organization-item.component.html',
  styleUrls: ['./browse-organization-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrowseOrganizationItemComponent implements OnInit {

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  organization!: Organization;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  ngOnInit(): void {
  }

}
