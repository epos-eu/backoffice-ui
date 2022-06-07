import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseApi } from '../_lib_code/api/baseApi.abstract';
import { EposBackOfficeHttpResponseHandler } from './eposBackofficeHttpResponseHandler';
import { GetOrganisations } from './organisation/getOrganisations';
import { GetWebservices } from './webservice/getWebservices';
import { GetDataProducts } from './dataProduct/getDataProducts';
import { GetSoftware } from './software/getSoftware';
import { GetPeople } from './people/getPeople';

@Injectable()
export class ApiService extends BaseApi {
  // turn on mock data by setting this to false
  private static readonly USE_LIVE_API = environment.useLiveApi;

  public readonly endpoints = {
    organisation: {
      getOrganisations: new GetOrganisations(ApiService.USE_LIVE_API),
    },
    webservice: {
      getWebservices: new GetWebservices(ApiService.USE_LIVE_API),
    },
    dataProduct: {
      getDataProducts: new GetDataProducts(ApiService.USE_LIVE_API),
    },
    software: {
      getSoftware: new GetSoftware(ApiService.USE_LIVE_API),
    },
    people: {
      getPeople: new GetPeople(ApiService.USE_LIVE_API),
    },
  };

  constructor(httpClient: HttpClient, injector: Injector) {
    super(injector, httpClient, new EposBackOfficeHttpResponseHandler(injector), environment.apiBaseUrl);

    // Add endpoints
    Object.values(this.endpoints).forEach((group: any) => {
      this.addEndpoints(Object.values(group));
    });
  }
}
