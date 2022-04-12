import { Api } from "../interfaces/webApi/api.interface";
import { Observable } from 'rxjs';
import { Organization } from '../models/entities/organization.model';

export class ApiService implements Api {
  private constructor() {}

  private static make() {}

  getOrganizations(): Observable<null | Organization[]> {
    return;
  }
  getOrganizationById(id: string): Observable<null | Organization> {
    return;
  }
}
