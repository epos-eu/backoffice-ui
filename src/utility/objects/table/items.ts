import { DataProduct, Distribution, Operation, Organization, WebService } from 'generated/backofficeSchemas';

export type TableItems =
  | Array<DataProduct>
  | Array<Distribution>
  | Array<Organization>
  | Array<WebService>
  | Array<Operation>;

export type TableItem = DataProduct | Distribution | Organization | WebService | Operation;
