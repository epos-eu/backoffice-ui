import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/components/layout/layout.component';
import { BrowseDataProductsComponent } from './browse-data-products/browse-data-products.component';
import { BrowseWebServicesItemComponent } from './browse-web-services/browse-web-services-item/browse-web-services-item.component';
import { BrowseWebServicesComponent } from './browse-web-services/browse-web-services.component';
import { BrowseDataProductsItemComponent } from './browse-data-products/browse-data-products-item/browse-data-products-item.component';
import { BrowseGroupsComponent } from './browse-groups/browse-groups.component';
import { BrowseDistributionComponent } from './browse-distribution/browse-distribution.component';
import { CreateDataProductItemComponent } from './browse-data-products/create-data-product-item/create-data-product-item.component';
import { BrowseDistributionItemComponent } from './browse-distribution/browse-distribution-item/browse-distribution-item.component';
import { CreateWebServiceItemComponent } from './browse-web-services/create-web-service-item/create-web-service-item.component';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { BrowseRevisionsComponent } from './browse-revisions/browse-revisions.component';

const routes: Routes = [
  {
    path: EntityEndpointValue.WEBSERVICE,
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseWebServicesComponent },
      { path: 'details/:metaId/:id', component: BrowseWebServicesItemComponent },
      { path: 'new', component: CreateWebServiceItemComponent },
    ],
  },
  {
    path: EntityEndpointValue.DISTRIBUTION,
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseDistributionComponent },
      { path: 'details/:metaId/:id', component: BrowseDistributionItemComponent },
    ],
  },
  {
    path: EntityEndpointValue.DATA_PRODUCT,
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseDataProductsComponent, pathMatch: 'full' },
      { path: 'details/:metaId/:id', component: BrowseDataProductsItemComponent },
      { path: 'new', component: CreateDataProductItemComponent },
    ],
  },
  {
    path: 'revisions',
    component: LayoutComponent,
    children: [{ path: 'compare/:id', component: BrowseRevisionsComponent }],
  },
  {
    path: 'groups',
    component: LayoutComponent,
    children: [{ path: '', component: BrowseGroupsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseRoutingModule {}
