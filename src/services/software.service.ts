import { Injectable } from '@angular/core';
import { ApiCaller } from 'src/api/apiCaller';
import { RequestMethod } from 'src/api/requestMethod.enum';

@Injectable({
  providedIn: 'root',
})
export class SoftwareService {
  constructor(private apiCaller: ApiCaller) {}

  getSoftware() {
    return this.apiCaller.doCall('software', RequestMethod.GET);
  }
}
