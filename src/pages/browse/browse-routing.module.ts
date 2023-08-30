import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/components/layout/layout.component';
import { BrowseDataProductsComponent } from './browse-data-products/browse-data-products.component';
import { BrowseEquipmentComponent } from './browse-equipment/browse-equipment.component';
import { BrowseFacilitiesComponent } from './browse-facilities/browse-facilities.component';
import { BrowseHomeComponent } from './browse-home/browse-home.component';
import { BrowseOrganizationItemComponent } from './browse-organization/browse-organization-item/browse-organization-item.component';
import { BrowseOrganizationComponent } from './browse-organization/browse-organization.component';
import { BrowsePeopleComponent } from './browse-people/browse-people.component';
import { BrowsePublicationsComponent } from './browse-publications/browse-publications.component';
import { BrowseServicesComponent } from './browse-services/browse-services.component';
import { BrowseWebServicesItemComponent } from './browse-web-services/browse-web-services-item/browse-web-services-item.component';
import { BrowseWebServicesComponent } from './browse-web-services/browse-web-services.component';
import { BrowseDataProductsItemComponent } from './browse-data-products/browse-data-products-item/browse-data-products-item.component';
import { BrowseContractComponent } from './browse-contract/browse-contract.component';
import { BrowseUsersComponent } from './browse-users/browse-users.component';
import { BrowseGroupsComponent } from './browse-groups/browse-groups.component';
import { BrowseStatisticsComponent } from './browse-statistics/browse-statistics.component';
import { BrowseContactPointComponent } from './browse-contact-point/browse-contact-point.component';
import { BrowseDistributionComponent } from './browse-distribution/browse-distribution.component';
import { CreateDataProductItemComponent } from './browse-data-products/create-data-product-item/create-data-product-item.component';
import { BrowseDistributionItemComponent } from './browse-distribution/browse-distribution-item/browse-distribution-item.component';
import { CreateDistributionItemComponent } from './browse-distribution/create-distribution-item/create-distribution-item.component';
import { CreateWebServiceItemComponent } from './browse-web-services/create-web-service-item/create-web-service-item.component';
import { BrowseContactPointItemComponent } from './browse-contact-point/browse-contact-point-item/browse-contact-point-item.component';
import { CreateContactPointItemComponent } from './browse-contact-point/create-contact-point-item/create-contact-point-item.component';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { BrowseRevisionsComponent } from './browse-revisions/browse-revisions.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: BrowseHomeComponent }],
  },
  {
    path: EntityEndpointValue.WEBSERVICE,
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseWebServicesComponent },
      { path: 'details/:id', component: BrowseWebServicesItemComponent },
      { path: 'new', component: CreateWebServiceItemComponent },
    ],
  },
  {
    path: EntityEndpointValue.ORGANIZATION,
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseOrganizationComponent },
      { path: 'details/:id', component: BrowseOrganizationItemComponent },
    ],
  },
  {
    path: EntityEndpointValue.DISTRIBUTION,
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseDistributionComponent },
      { path: 'details/:id', component: BrowseDistributionItemComponent },
      { path: 'new', component: CreateDistributionItemComponent },
    ],
  },
  {
    path: EntityEndpointValue.CONTACT_POINT,
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseContactPointComponent },
      { path: 'details/:id', component: BrowseContactPointItemComponent },
      { path: 'new', component: CreateContactPointItemComponent },
    ],
  },
  {
    path: EntityEndpointValue.DATA_PRODUCT,
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseDataProductsComponent },
      { path: 'details/:id', component: BrowseDataProductsItemComponent },
      { path: 'new', component: CreateDataProductItemComponent },
    ],
  },
  {
    path: 'revisions',
    component: LayoutComponent,
    children: [{ path: 'compare/:id', component: BrowseRevisionsComponent }],
  },
  {
    path: 'services',
    component: LayoutComponent,
    children: [{ path: '', component: BrowseServicesComponent }],
  },
  {
    path: 'people',
    component: LayoutComponent,
    children: [{ path: '', component: BrowsePeopleComponent }],
  },
  {
    path: 'contract',
    component: LayoutComponent,
    children: [{ path: '', component: BrowseContractComponent }],
  },
  {
    path: 'users',
    component: LayoutComponent,
    children: [{ path: '', component: BrowseUsersComponent }],
  },
  {
    path: 'groups',
    component: LayoutComponent,
    children: [{ path: '', component: BrowseGroupsComponent }],
  },
  {
    path: 'publications',
    component: LayoutComponent,
    children: [{ path: '', component: BrowsePublicationsComponent }],
  },
  {
    path: 'facilities',
    component: LayoutComponent,
    children: [{ path: '', component: BrowseFacilitiesComponent }],
  },
  {
    path: 'equipment',
    component: LayoutComponent,
    children: [{ path: '', component: BrowseEquipmentComponent }],
  },
  {
    path: 'statistics',
    component: LayoutComponent,
    children: [{ path: '', component: BrowseStatisticsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseRoutingModule {}
