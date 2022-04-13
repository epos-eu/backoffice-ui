import { Injectable } from "@angular/core";
import { ApiCaller } from "src/api/apiCaller";
import { RequestMethod } from "src/api/requestMethod.enum";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  constructor(private apiCaller: ApiCaller) {}

  getOrganizations() {
    return this.apiCaller.doCall('organization', RequestMethod.GET);
  }
}
