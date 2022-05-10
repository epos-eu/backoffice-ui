import { Injectable } from '@angular/core';
import { ApiCaller } from 'src/api/apiCaller';
import { RequestMethod } from 'src/api/requestMethod.enum';

@Injectable({
  providedIn: 'root',
})
export class DataProductsService {
  constructor(private apiCaller: ApiCaller) {}

  getWebservices() {
    return this.apiCaller.doCall('dataProduct', RequestMethod.GET);
  }
}
