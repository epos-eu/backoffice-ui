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
import { BrowseSoftwareComponent } from './browse-software/browse-software.component';
import { BrowseWebServicesItemComponent } from './browse-web-services/browse-web-services-item/browse-web-services-item.component';
import { BrowseWebServicesComponent } from './browse-web-services/browse-web-services.component';
import { BrowseDataProductsItemComponent } from './browse-data-products/browse-data-products-item/browse-data-products-item.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: BrowseHomeComponent }],
  },
  {
    path: 'web-services',
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseWebServicesComponent },
      { path: 'details/:id', component: BrowseWebServicesItemComponent },
    ],
  },
  {
    path: 'organization',
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseOrganizationComponent },
      { path: 'details/:id', component: BrowseOrganizationItemComponent },
    ],
  },
  {
    path: 'software',
    component: LayoutComponent,
    children: [{ path: '', component: BrowseSoftwareComponent }],
  },
  {
    path: 'data-products',
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseDataProductsComponent },
      { path: 'details/:id', component: BrowseDataProductsItemComponent },
    ],
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseRoutingModule {}
