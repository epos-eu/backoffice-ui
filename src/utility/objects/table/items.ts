import { ContactPoint } from 'src/apiAndObjects/objects/entities/contactPoint.model';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { Operation } from 'src/apiAndObjects/objects/entities/operation.model';
import { Organization } from 'src/apiAndObjects/objects/entities/organization.model';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';

export type TableItems =
  | Array<ContactPoint>
  | Array<DataProduct>
  | Array<Distribution>
  | Array<Organization>
  | Array<WebService>
  | Array<Operation>;

export type TableItem = ContactPoint | DataProduct | Distribution | Organization | WebService | Operation;
