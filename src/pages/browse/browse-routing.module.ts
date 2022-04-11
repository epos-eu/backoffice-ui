import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "src/components/layout/layout.component";
import { BrowseHomeComponent } from "./browse-home/browse-home.component";
import { BrowseOrganizationComponent } from "./browse-organization/browse-organization.component";
import { BrowseWebServicesComponent } from "./browse-web-services/browse-web-services.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseHomeComponent }
    ]
  },
  {
    path: 'web-services',
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseWebServicesComponent }
    ]
  },
  {
    path: 'organization',
    component: LayoutComponent,
    children: [
      { path: '', component: BrowseOrganizationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrowseRoutingModule {}
