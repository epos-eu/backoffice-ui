import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SideNavigationModule } from './side-navigation/side-navigation.module';
import { DialogModule } from './dialogs/dialog.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LayoutComponent, LoginComponent],
  imports: [RouterModule, CommonModule, AngularMaterialModule, SideNavigationModule, DialogModule],
  exports: [LayoutComponent],
})
export class ComponentsModule {}
