import { Injectable } from '@angular/core';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { WebserviceDataSource } from 'src/apiAndObjects/objects/webserviceDataSource';

@Injectable({
  providedIn: 'root',
})
export class WebservicesService {
  constructor(private apiService: ApiService) {}

  public getWebservices(): Promise<WebserviceDataSource[]> {
    return this.apiService.endpoints.webservice.getWebservices.call();
  }
}
