import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportHomeComponent } from './import-home/import-home.component';
import { ImportRoutingModule } from './import-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [ImportHomeComponent],
  imports: [CommonModule, ImportRoutingModule, AngularMaterialModule],
})
export class ImportModule {}
