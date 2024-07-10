import { DataProduct } from 'generated/backofficeSchemas';

export interface TableDetail {
  uid: string;
  title: string;
  lastChange: Date | string;
  status: DataProduct['status'];
  changeComment: string;
  author: string;
  instanceId: string;
  metaId: string;
  versionInfo: string;
  dataProduct?: DataProduct;
}
