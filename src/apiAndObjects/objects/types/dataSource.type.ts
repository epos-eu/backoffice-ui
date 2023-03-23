import { GetAllContactPoints } from 'src/apiAndObjects/api/contact-point/getAllContactPoints';
import { GetContactPointDetail } from 'src/apiAndObjects/api/contact-point/getContactPointDetail';
import { GetAllDataProducts } from 'src/apiAndObjects/api/data-products/getAllDataProducts';
import { GetDataProductDetail } from 'src/apiAndObjects/api/data-products/getDataProductDetail';
import { PostDataProductDetails } from 'src/apiAndObjects/api/data-products/postDataProductDetails';
import { GetAllDistributions } from 'src/apiAndObjects/api/distribution/getAllDistributions';
import { GetDistributionDetail } from 'src/apiAndObjects/api/distribution/getDistributionDetail';
import { GetAllOperations } from 'src/apiAndObjects/api/operation/getAllOperations';
import { GetOperationDetails } from 'src/apiAndObjects/api/operation/getOperationDetails';
import { GetAllOrganizations } from 'src/apiAndObjects/api/organization/getAllOrganizations';
import { GetAllPeople } from 'src/apiAndObjects/api/person/getAllPeople';
import { GetAllUsers } from 'src/apiAndObjects/api/user/getAllUsers';
import { GetUserInfo } from 'src/apiAndObjects/api/user/getUserInfo';
import { SetUserRole } from 'src/apiAndObjects/api/user/setUserRole';
import { GetAllWebservices } from 'src/apiAndObjects/api/webservice/getAllWebservices';
import { GetWebserviceDetail } from 'src/apiAndObjects/api/webservice/getWebserviceDetail';

export type DataSource =
  | GetDistributionDetail
  | GetAllDistributions
  | GetWebserviceDetail
  | GetAllWebservices
  | GetAllOperations
  | PostDataProductDetails
  | GetAllDataProducts
  | SetUserRole
  | GetUserInfo
  | GetAllUsers
  | GetOperationDetails
  | GetDataProductDetail
  | GetContactPointDetail
  | GetAllContactPoints
  | GetAllPeople
  | GetAllOrganizations;
