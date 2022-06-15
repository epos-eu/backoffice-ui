import { Injectable } from '@angular/core';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { OrganisationDataSource } from 'src/apiAndObjects/objects/organisationDataSource';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private apiService: ApiService) {}

  public getOrganizations(): Promise<OrganisationDataSource[]> {
    return this.apiService.endpoints.organisation.getOrganisations.call();
  }
}
