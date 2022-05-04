import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportHomeComponent } from './import-home/import-home.component';
import { ImportRoutingModule } from './import-routing.module';

@NgModule({
  declarations: [ImportHomeComponent],
  imports: [CommonModule, ImportRoutingModule],
})
export class ImportModule {}
