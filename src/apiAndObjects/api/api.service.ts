import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseApi } from '../_lib_code/api/baseApi.abstract';
import { EposBackOfficeHttpResponseHandler } from './eposBackofficeHttpResponseHandler';
import { GetIndexDetails } from './index/getIndexDetails';
import { GetDistributionDetail } from './distribution/getDistributionDetail';
import { GetWebserviceDetail } from './webservice/getWebserviceDetail';

@Injectable()
export class ApiService extends BaseApi {
  // turn on mock data by setting this to false
  private static readonly USE_LIVE_API = environment.useLiveApi;

  public readonly endpoints = {
    index: {
      getIndexDetails: new GetIndexDetails(ApiService.USE_LIVE_API),
    },
    distribution: {
      getDistributionDetail: new GetDistributionDetail(ApiService.USE_LIVE_API),
    },
    webservice: {
      getWebserviceDetail: new GetWebserviceDetail(ApiService.USE_LIVE_API),
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
