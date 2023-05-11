import { ContactPointDataSource } from 'src/apiAndObjects/objects/contactPointDataSource';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/dataProductDetailDataSource';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/distributionDetailDataSource';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/operationDetailDataSource';
import { OrganizationDataSource } from 'src/apiAndObjects/objects/organizationDataSource';
import { PersonDataSource } from 'src/apiAndObjects/objects/personDataSource';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/webserviceDetailDataSource';

export type TableItems =
  | Array<ContactPointDataSource>
  | Array<DataProductDetailDataSource>
  | Array<DistributionDetailDataSource>
  | Array<OrganizationDataSource>
  | Array<PersonDataSource>
  | Array<WebserviceDetailDataSource>
  | Array<OperationDetailDataSource>;

export type TableItem =
  | ContactPointDataSource
  | DataProductDetailDataSource
  | DistributionDetailDataSource
  | OrganizationDataSource
  | PersonDataSource
  | WebserviceDetailDataSource
  | OperationDetailDataSource;
