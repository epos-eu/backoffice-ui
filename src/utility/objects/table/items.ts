import { ContactPointDataSource } from 'src/apiAndObjects/objects/contactPointDataSource';
import { DataProductsDataSource } from 'src/apiAndObjects/objects/dataProductsDataSource';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/distributionDetailDataSource';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/operationDetailDataSource';
import { OrganizationDataSource } from 'src/apiAndObjects/objects/organizationDataSource';
import { PersonDataSource } from 'src/apiAndObjects/objects/personDataSource';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/webserviceDetailDataSource';

export type TableItems =
  | Array<ContactPointDataSource>
  | Array<DataProductsDataSource>
  | Array<DistributionDetailDataSource>
  | Array<OrganizationDataSource>
  | Array<PersonDataSource>
  | Array<WebserviceDetailDataSource>
  | Array<OperationDetailDataSource>;

export type TableItem =
  | ContactPointDataSource
  | DataProductsDataSource
  | DistributionDetailDataSource
  | OrganizationDataSource
  | PersonDataSource
  | WebserviceDetailDataSource
  | OperationDetailDataSource;
