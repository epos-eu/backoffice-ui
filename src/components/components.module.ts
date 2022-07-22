import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SideNavigationModule } from './side-navigation/side-navigation.module';
import { DialogModule } from './dialogs/dialog.module';
import { LoginComponent } from './login/login.component';
import { ActionsDataComponent } from './actions-data/actions-data.component';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [LayoutComponent, ActionsDataComponent, LoginComponent],
  imports: [RouterModule, CommonModule, AngularMaterialModule, SideNavigationModule, DialogModule, MatChipsModule],
  exports: [LayoutComponent, ActionsDataComponent],
})
export class ComponentsModule {}
