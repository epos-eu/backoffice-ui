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
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { ChartComponent } from './chart/chart.component';
import { TableComponent } from './table/table.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from './back-button/back-button.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ActionsDataComponent,
    LoginComponent,
    ChartComponent,
    TableComponent,
    TableFilterComponent,
    BackButtonComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    AngularMaterialModule,
    SideNavigationModule,
    DialogModule,
    MatChipsModule,
    ChartjsModule,
    MatExpansionModule,
    MatIconModule,
  ],
  exports: [LayoutComponent, ActionsDataComponent, ChartComponent, TableComponent, BackButtonComponent],
})
export class ComponentsModule {}
