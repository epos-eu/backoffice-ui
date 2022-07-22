import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../apiAndObjects/api/api.service';
import { ApiLoginService } from './api/api-login.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  exports: [],
  providers: [ApiService, ApiLoginService],
})
export class ApiModule {}
