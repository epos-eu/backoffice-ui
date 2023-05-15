import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { OrganizationDataSource } from 'src/apiAndObjects/objects/data-source/organizationDataSource';
import { PersonDataSource } from 'src/apiAndObjects/objects/data-source/personDataSource';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';

export type TableItems =
  | Array<ContactPointDetailDataSource>
  | Array<DataProductDetailDataSource>
  | Array<DistributionDetailDataSource>
  | Array<OrganizationDataSource>
  | Array<PersonDataSource>
  | Array<WebserviceDetailDataSource>
  | Array<OperationDetailDataSource>;

export type TableItem =
  | ContactPointDetailDataSource
  | DataProductDetailDataSource
  | DistributionDetailDataSource
  | OrganizationDataSource
  | PersonDataSource
  | WebserviceDetailDataSource
  | OperationDetailDataSource;
