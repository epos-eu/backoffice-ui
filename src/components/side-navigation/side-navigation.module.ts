import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseNavigationComponent } from './browse-navigation/browse-navigation.component';

import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ImportNavigationComponent } from './import-navigation/import-navigation.component';

@NgModule({
  declarations: [BrowseNavigationComponent, ImportNavigationComponent],
  imports: [CommonModule, RouterModule, MatIconModule, MatListModule],
  exports: [BrowseNavigationComponent, ImportNavigationComponent],
})
export class SideNavigationModule {}
