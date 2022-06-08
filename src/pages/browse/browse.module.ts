import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseHomeComponent } from './browse-home/browse-home.component';
import { BrowseWebServicesComponent } from './browse-web-services/browse-web-services.component';
import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseOrganizationComponent } from './browse-organization/browse-organization.component';
import { BrowseOrganizationItemComponent } from './browse-organization/browse-organization-item/browse-organization-item.component';
import { BrowseWebServicesItemComponent } from './browse-web-services/browse-web-services-item/browse-web-services-item.component';
import { SnackbarComponent } from 'src/components/snackbar/snackbar.component';
import { BrowseSoftwareComponent } from './browse-software/browse-software.component';
import { BrowseDataProductsComponent } from './browse-data-products/browse-data-products.component';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowsePeopleComponent } from './browse-people/browse-people.component';
import { BrowseServicesComponent } from './browse-services/browse-services.component';
import { BrowseFacilitiesComponent } from './browse-facilities/browse-facilities.component';
import { BrowseEquipmentComponent } from './browse-equipment/browse-equipment.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { BrowsePublicationsComponent } from './browse-publications/browse-publications.component';

@NgModule({
  declarations: [
    BrowseHomeComponent,
    BrowseWebServicesComponent,
    BrowseOrganizationComponent,
    BrowseOrganizationItemComponent,
    BrowseWebServicesItemComponent,
    SnackbarComponent,
    BrowseSoftwareComponent,
    BrowseDataProductsComponent,
    BrowsePeopleComponent,
    BrowseServicesComponent,
    BrowseFacilitiesComponent,
    BrowseEquipmentComponent,
    BrowsePublicationsComponent,
  ],
  imports: [CommonModule, BrowseRoutingModule, AngularMaterialModule],
  exports: [],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class BrowseModule {}
