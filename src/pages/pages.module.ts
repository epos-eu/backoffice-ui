import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportModule } from './import/import.module';
import { BrowseModule } from './browse/browse.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ImportModule,
    BrowseModule
  ]
})
export class PagesModule { }
