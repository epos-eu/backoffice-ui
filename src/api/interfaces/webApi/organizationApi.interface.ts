import { Observable } from 'rxjs';
import { Organization } from 'src/api/models/entities/organization.model';
export interface OrganizationApi {
  getOrganizations(): Observable<null | Organization[]>;
  getOrganizationById(id: string): Observable<null | Organization>;
}
