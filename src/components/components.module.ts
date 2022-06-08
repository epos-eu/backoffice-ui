import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { DialogDeleteComponent } from './dialogs/dialog-delete/dialog-delete.component';
import { DialogAddPersonComponent } from './dialogs/dialog-add-person/dialog-add-person.component';
import { DialogAddContactComponent } from './dialogs/dialog-add-contact/dialog-add-contact.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SideNavigationModule } from './side-navigation/side-navigation.module';

@NgModule({
  declarations: [LayoutComponent, DialogDeleteComponent, DialogAddPersonComponent, DialogAddContactComponent],
  imports: [RouterModule, CommonModule, AngularMaterialModule, SideNavigationModule],
  exports: [LayoutComponent],
})
export class ComponentsModule {}
