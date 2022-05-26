import { Injectable } from '@angular/core';
import { ApiCaller } from 'src/apiAndObjects/_lib_code/api/apiCaller';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';

@Injectable({
  providedIn: 'root',
})
export class DataProductsService {
  constructor(private apiCaller: ApiCaller) {}

  getWebservices() {
    return this.apiCaller.doCall('dataProduct', RequestMethod.GET);
  }
}
