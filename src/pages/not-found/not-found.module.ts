import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  imports: [CommonModule, AngularMaterialModule, NotFoundRoutingModule],
  declarations: [NotFoundComponent],
})
export class NotFoundModule {}
