import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseHomeComponent } from './browse-home/browse-home.component';
import { BrowseWebServicesComponent } from './browse-web-services/browse-web-services.component';
import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseOrganizationComponent } from './browse-organization/browse-organization.component';

import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    BrowseHomeComponent,
    BrowseWebServicesComponent,
    BrowseOrganizationComponent
  ],
  imports: [
    CommonModule,
    BrowseRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatInputModule
  ]
})
export class BrowseModule { }
