import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseApi } from '../_lib_code/api/baseApi.abstract';
import { EposBackOfficeHttpResponseHandler } from './eposBackofficeHttpResponseHandler';
import { GetDistributionDetail } from './distribution/getDistributionDetail';
import { GetWebserviceDetail } from './webservice/getWebserviceDetail';
import { GetOperationDetails } from './operation/getOperationDetails';
import { GetDataProductDetail } from './data-products/getDataProductDetail';
import { UpdateUser } from './user/updateUser';
import { GetContactPointDetail } from './contact-point/getContactPointDetail';
import { PostDataProductDetails } from './data-products/postDataProductDetails';
import { GetUserInfo } from './user/getUserInfo';
import { GetAllDataProducts } from './data-products/getAllDataProducts';
import { GetAllWebservices } from './webservice/getAllWebservices';
import { GetAllDistributions } from './distribution/getAllDistributions';
import { GetAllContactPoints } from './contact-point/getAllContactPoints';
import { GetAllUsers } from './user/getAllUsers';
import { GetAllPeople } from './person/getAllPeople';
import { GetAllOrganizations } from './organization/getAllOrganizations';
import { GetAllOperations } from './operation/getAllOperations';
import { PostContactPointDetail } from './contact-point/createContactPointDetails';
import { PostOrganizationDetail } from './organization/postOrganizationDetails';
import { PostPersonDetail } from './person/postPesonDetail';
import { PostOperationDetail } from './operation/createOperationDetail';
import { CreateUserDetail } from './user/createUserDetail';
import { CreateDistributionDetail } from './distribution/createDistributionDetail';

@Injectable()
export class ApiService extends BaseApi {
  // turn on mock data by setting this to false
  private static readonly USE_LIVE_API = environment.useLiveApi;

  public readonly endpoints = {
    Distribution: {
      getDistributionDetail: new GetDistributionDetail(ApiService.USE_LIVE_API),
      getAll: new GetAllDistributions(ApiService.USE_LIVE_API),
      createDistribution: new CreateDistributionDetail(ApiService.USE_LIVE_API),
    },
    Webservice: {
      getWebserviceDetail: new GetWebserviceDetail(ApiService.USE_LIVE_API),
      getAll: new GetAllWebservices(ApiService.USE_LIVE_API),
    },
    Operation: {
      getOperationDetail: new GetOperationDetails(ApiService.USE_LIVE_API),
      getAll: new GetAllOperations(ApiService.USE_LIVE_API),
      postOperationDetail: new PostOperationDetail(ApiService.USE_LIVE_API),
    },
    DataProduct: {
      getDataProductDetail: new GetDataProductDetail(ApiService.USE_LIVE_API),
      postDataProductDetail: new PostDataProductDetails(ApiService.USE_LIVE_API),
      getAll: new GetAllDataProducts(ApiService.USE_LIVE_API),
    },
    User: {
      updateUser: new UpdateUser(ApiService.USE_LIVE_API),
      getUserInfo: new GetUserInfo(ApiService.USE_LIVE_API),
      getAll: new GetAllUsers(ApiService.USE_LIVE_API),
      createUser: new CreateUserDetail(ApiService.USE_LIVE_API),
    },
    Contactpoint: {
      getContactPointDetail: new GetContactPointDetail(ApiService.USE_LIVE_API),
      getAll: new GetAllContactPoints(ApiService.USE_LIVE_API),
      postContactPointDetail: new PostContactPointDetail(ApiService.USE_LIVE_API),
    },
    Person: {
      getAll: new GetAllPeople(ApiService.USE_LIVE_API),
      postPersonDetail: new PostPersonDetail(ApiService.USE_LIVE_API),
    },
    Organization: {
      getAll: new GetAllOrganizations(ApiService.USE_LIVE_API),
      postOrganizationDetail: new PostOrganizationDetail(ApiService.USE_LIVE_API),
    },
  };

  constructor(httpClient: HttpClient, injector: Injector) {
    super(injector, httpClient, new EposBackOfficeHttpResponseHandler(injector), environment.apiBaseUrl);

    // Add endpoints
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.values(this.endpoints).forEach((group: any) => {
      this.addEndpoints(Object.values(group));
    });
  }
}
