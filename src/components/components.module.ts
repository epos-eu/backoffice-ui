import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SideNavigationModule } from './side-navigation/side-navigation.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogDeleteComponent } from './dialogs/dialog-delete/dialog-delete.component';
import { DialogAddPersonComponent } from './dialogs/dialog-add-person/dialog-add-person.component';
import { MatInputModule } from '@angular/material/input';
import { DialogAddContactComponent } from './dialogs/dialog-add-contact/dialog-add-contact.component';
import { MatSelectModule } from '@angular/material/select';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [LayoutComponent, DialogDeleteComponent, DialogAddPersonComponent, DialogAddContactComponent],
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    SideNavigationModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgScrollbarModule,
  ],
  exports: [LayoutComponent],
})
export class ComponentsModule {}
