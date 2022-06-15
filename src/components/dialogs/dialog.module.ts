import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogAddPersonComponent } from './dialog-add-person/dialog-add-person.component';
import { DialogAddContactComponent } from './dialog-add-contact/dialog-add-contact.component';
import { MetadataFileViewComponent } from './metadata-file-view/metadata-file-view.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [DialogDeleteComponent, DialogAddPersonComponent, DialogAddContactComponent, MetadataFileViewComponent],
  imports: [CommonModule, AngularMaterialModule],
})
export class DialogModule {}
