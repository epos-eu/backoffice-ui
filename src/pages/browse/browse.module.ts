import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
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
import { BrowseContractComponent } from './browse-contract/browse-contract.component';
import { BrowseUsersComponent } from './browse-users/browse-users.component';
import { BrowseGroupsComponent } from './browse-groups/browse-groups.component';
import { BrowseStatisticsComponent } from './browse-statistics/browse-statistics.component';
import { BrowseContactPointComponent } from './browse-contact-point/browse-contact-point.component';
import { BrowseDistributionComponent } from './browse-distribution/browse-distribution.component';
import { ComponentsModule } from 'src/components/components.module';
import { CreateDataProductItemComponent } from './browse-data-products/create-data-product-item/create-data-product-item.component';
import { BrowseDistributionItemComponent } from './browse-distribution/browse-distribution-item/browse-distribution-item.component';
import { CreateDistributionItemComponent } from './browse-distribution/create-distribution-item/create-distribution-item.component';
import { CreateWebServiceItemComponent } from './browse-web-services/create-web-service-item/create-web-service-item.component';
import { CreateContactPointItemComponent } from './browse-contact-point/create-contact-point-item/create-contact-point-item.component';
import { BrowseContactPointItemComponent } from './browse-contact-point/browse-contact-point-item/browse-contact-point-item.component';
import { ContactPointFormDetailsComponent } from './browse-data-products/browse-data-products-item/contact-point-form-details/contact-point-form-details.component';
import { DistributionFormDetailsComponent } from './browse-data-products/browse-data-products-item/distribution-form-details/distribution-form-details.component';
import { WebserviceFormDetailsComponent } from './browse-data-products/browse-data-products-item/distribution-form-details/webservice-form-details/webservice-form-details.component';
import { SpatialCoverageMapComponent } from './browse-data-products/browse-data-products-item/spatial-coverage-form-details/spatial-coverage-map/spatial-coverage-map.component';
import { SideNavigationModule } from 'src/components/side-navigation/side-navigation.module';
import { OperationParametersComponent } from './browse-data-products/browse-data-products-item/operation-parameters/operation-parameters.component';
import { OptionIntegerComponent } from './browse-data-products/browse-data-products-item/operation-parameters/option-integer/option-integer.component';
import { OptionDatetimeComponent } from './browse-data-products/browse-data-products-item/operation-parameters/option-datetime/option-datetime.component';
import { OptionStringComponent } from './browse-data-products/browse-data-products-item/operation-parameters/option-string/option-string.component';
import { OptionDateComponent } from './browse-data-products/browse-data-products-item/operation-parameters/option-date/option-date.component';
import { OptionCoordinateComponent } from './browse-data-products/browse-data-products-item/operation-parameters/option-coordinate/option-coordinate.component';
import { OptionBooleanComponent } from './browse-data-products/browse-data-products-item/operation-parameters/option-boolean/option-boolean.component';
import { OptionFloatComponent } from './browse-data-products/browse-data-products-item/operation-parameters/option-float/option-float.component';
import { ContactPointDetailComponent } from './browse-data-products/browse-data-products-item/contact-point-form-details/contact-point-detail/contact-point-detail.component';
import { BrowseRevisionsComponent } from './browse-revisions/browse-revisions.component';
import { SimpleSpatialControlComponent } from './browse-data-products/browse-data-products-item/spatial-coverage-form-details/spatial-coverage-map/simpleSpatialControl/simpleSpatialControl.component';

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
    ContactPointDetailComponent,
    DistributionFormDetailsComponent,
    WebserviceFormDetailsComponent,
    SpatialCoverageMapComponent,
    OperationParametersComponent,
    OptionIntegerComponent,
    OptionDatetimeComponent,
    OptionStringComponent,
    OptionDateComponent,
    OptionCoordinateComponent,
    OptionBooleanComponent,
    OptionFloatComponent,
    BrowseRevisionsComponent,
    SimpleSpatialControlComponent,
  ],
  imports: [CommonModule, BrowseRoutingModule, AngularMaterialModule, ComponentsModule, NgFor, SideNavigationModule],
  exports: [],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class BrowseModule {}
