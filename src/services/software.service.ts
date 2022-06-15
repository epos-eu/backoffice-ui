import { Injectable } from '@angular/core';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { SoftwareDataSource } from 'src/apiAndObjects/objects/softwareDataSource';

@Injectable({
  providedIn: 'root',
})
export class SoftwareService {
  constructor(private apiService: ApiService) {}

  getSoftware(): Promise<SoftwareDataSource[]> {
    return this.apiService.endpoints.software.getSoftware.call();
  }
}
