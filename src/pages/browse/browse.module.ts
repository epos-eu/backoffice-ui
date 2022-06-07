import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseHomeComponent } from './browse-home/browse-home.component';
import { BrowseWebServicesComponent } from './browse-web-services/browse-web-services.component';
import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseOrganizationComponent } from './browse-organization/browse-organization.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowseOrganizationItemComponent } from './browse-organization/browse-organization-item/browse-organization-item.component';
import { BrowseWebServicesItemComponent } from './browse-web-services/browse-web-services-item/browse-web-services-item.component';
import { SnackbarComponent } from 'src/components/snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowseSoftwareComponent } from './browse-software/browse-software.component';
import { BrowseDataProductsComponent } from './browse-data-products/browse-data-products.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BrowsePeopleComponent } from './browse-people/browse-people.component';
import { BrowseServicesComponent } from './browse-services/browse-services.component';

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
  ],
  imports: [
    CommonModule,
    BrowseRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    NgScrollbarModule,
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
