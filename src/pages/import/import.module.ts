import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportHomeComponent } from './import-home/import-home.component';
import { ImportRoutingModule } from './import-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { NewImportComponent } from './new-import/new-import.component';
import { ImportStatusComponent } from './import-status/import-status.component';

@NgModule({
  declarations: [ImportHomeComponent, NewImportComponent, ImportStatusComponent],
  imports: [CommonModule, ImportRoutingModule, AngularMaterialModule],
  providers: [],
})
export class ImportModule {}
