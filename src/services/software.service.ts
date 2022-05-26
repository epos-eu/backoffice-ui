import { Injectable } from '@angular/core';
import { ApiCaller } from 'src/apiAndObjects/_lib_code/api/apiCaller';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';

@Injectable({
  providedIn: 'root',
})
export class SoftwareService {
  constructor(private apiCaller: ApiCaller) {}

  getSoftware() {
    return this.apiCaller.doCall('software', RequestMethod.GET);
  }
}
