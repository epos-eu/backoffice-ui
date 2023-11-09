import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';

export interface TableDetail {
  uid: string;
  title: string;
  lastChange: Date | string;
  status: string;
  changeComment: string;
  author: string;
  instanceId: string;
  metaId: string;
  versionInfo: string;
  dataProduct?: EntityDetail | null;
}
