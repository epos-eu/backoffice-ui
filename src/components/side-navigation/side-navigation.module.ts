import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseNavigationComponent } from './browse-navigation/browse-navigation.component';
import { RouterModule } from '@angular/router';
import { ImportNavigationComponent } from './import-navigation/import-navigation.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { EditNavigationComponent } from './edit-navigation/edit-navigation.component';
import { MatChipsModule } from '@angular/material/chips';
import { ExplorerNavigationComponent } from './explorer-navigation/explorer-navigation.component';
import { AnchorNavigationComponent } from './explorer-navigation/anchor-navigation/anchor-navigation.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { DataproductNavigationComponent } from './dataproduct-navigation/dataproduct-navigation.component';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@NgModule({
  declarations: [
    BrowseNavigationComponent,
    ImportNavigationComponent,
    EditNavigationComponent,
    ExplorerNavigationComponent,
    AnchorNavigationComponent,
    BackButtonComponent,
    DataproductNavigationComponent,
  ],
  imports: [CommonModule, RouterModule, AngularMaterialModule, MatChipsModule, SkeletonLoaderComponent],
  exports: [
    BrowseNavigationComponent,
    ImportNavigationComponent,
    EditNavigationComponent,
    ExplorerNavigationComponent,
    AnchorNavigationComponent,
    DataproductNavigationComponent,
  ],
})
export class SideNavigationModule {}
