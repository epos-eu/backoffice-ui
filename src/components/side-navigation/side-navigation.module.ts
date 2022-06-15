import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseNavigationComponent } from './browse-navigation/browse-navigation.component';
import { RouterModule } from '@angular/router';
import { ImportNavigationComponent } from './import-navigation/import-navigation.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [BrowseNavigationComponent, ImportNavigationComponent],
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  exports: [BrowseNavigationComponent, ImportNavigationComponent],
})
export class SideNavigationModule {}
