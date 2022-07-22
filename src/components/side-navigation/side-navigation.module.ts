import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseNavigationComponent } from './browse-navigation/browse-navigation.component';
import { RouterModule } from '@angular/router';
import { ImportNavigationComponent } from './import-navigation/import-navigation.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { EditNavigationComponent } from './edit-navigation/edit-navigation.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [BrowseNavigationComponent, ImportNavigationComponent, EditNavigationComponent],
  imports: [CommonModule, RouterModule, AngularMaterialModule, MatChipsModule],
  exports: [BrowseNavigationComponent, ImportNavigationComponent, EditNavigationComponent],
})
export class SideNavigationModule {}
