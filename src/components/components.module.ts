import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SideNavigationModule } from './side-navigation/side-navigation.module';
import { DialogModule } from './dialogs/dialog.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [RouterModule, CommonModule, AngularMaterialModule, SideNavigationModule, DialogModule],
  exports: [LayoutComponent],
})
export class ComponentsModule {}
