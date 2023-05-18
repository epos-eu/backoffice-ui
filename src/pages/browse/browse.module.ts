import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseHomeComponent } from './browse-home/browse-home.component';
import { BrowseWebServicesComponent } from './browse-web-services/browse-web-services.component';
import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseOrganizationComponent } from './browse-organization/browse-organization.component';
import { BrowseOrganizationItemComponent } from './browse-organization/browse-organization-item/browse-organization-item.component';
import { BrowseWebServicesItemComponent } from './browse-web-services/browse-web-services-item/browse-web-services-item.component';
import { SnackbarComponent } from 'src/components/snackbar/snackbar.component';
import { BrowseDataProductsComponent } from './browse-data-products/browse-data-products.component';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowseFacilitiesComponent } from './browse-facilities/browse-facilities.component';
import { BrowseEquipmentComponent } from './browse-equipment/browse-equipment.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { BrowsePublicationsComponent } from './browse-publications/browse-publications.component';
import { BrowsePeopleComponent } from './browse-people/browse-people.component';
import { BrowseServicesComponent } from './browse-services/browse-services.component';
import { BrowseDataProductsItemComponent } from './browse-data-products/browse-data-products-item/browse-data-products-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { BrowseContractComponent } from './browse-contract/browse-contract.component';
import { BrowseUsersComponent } from './browse-users/browse-users.component';
import { BrowseGroupsComponent } from './browse-groups/browse-groups.component';
import { BrowseStatisticsComponent } from './browse-statistics/browse-statistics.component';
import { BrowseContactPointComponent } from './browse-contact-point/browse-contact-point.component';
import { BrowseDistributionComponent } from './browse-distribution/browse-distribution.component';
import { ComponentsModule } from 'src/components/components.module';
import { CreateDataProductItemComponent } from './browse-data-products/create-data-product-item/create-data-product-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowseDistributionItemComponent } from './browse-distribution/browse-distribution-item/browse-distribution-item.component';
import { CreateDistributionItemComponent } from './browse-distribution/create-distribution-item/create-distribution-item.component';
import { CreateWebServiceItemComponent } from './browse-web-services/create-web-service-item/create-web-service-item.component';
import { CreateContactPointItemComponent } from './browse-contact-point/create-contact-point-item/create-contact-point-item.component';
import { BrowseContactPointItemComponent } from './browse-contact-point/browse-contact-point-item/browse-contact-point-item.component';
import { ContactPointFormDetailsComponent } from './browse-data-products/browse-data-products-item/contact-point-form-details/contact-point-form-details.component';

@NgModule({
  declarations: [
    BrowseHomeComponent,
    BrowseWebServicesComponent,
    BrowseOrganizationComponent,
    BrowseOrganizationItemComponent,
    BrowseWebServicesItemComponent,
    SnackbarComponent,
    BrowseDataProductsComponent,
    BrowsePeopleComponent,
    BrowseServicesComponent,
    BrowseFacilitiesComponent,
    BrowseEquipmentComponent,
    BrowsePublicationsComponent,
    BrowseDataProductsItemComponent,
    BrowseContractComponent,
    BrowseUsersComponent,
    BrowseGroupsComponent,
    BrowseStatisticsComponent,
    BrowseContactPointComponent,
    BrowseDistributionComponent,
    CreateDataProductItemComponent,
    BrowseDistributionItemComponent,
    CreateDistributionItemComponent,
    CreateWebServiceItemComponent,
    CreateContactPointItemComponent,
    BrowseContactPointItemComponent,
    ContactPointFormDetailsComponent,
  ],
  imports: [
    CommonModule,
    BrowseRoutingModule,
    AngularMaterialModule,
    MatExpansionModule,
    MatChipsModule,
    ComponentsModule,
    MatProgressSpinnerModule,
  ],
  exports: [],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class BrowseModule {}
