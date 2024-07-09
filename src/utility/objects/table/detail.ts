import { DataProduct } from 'generated/backofficeSchemas';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';

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
  dataProduct?: EntityDetail | null;
}
