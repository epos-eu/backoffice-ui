import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { PeopleDataSource } from 'src/apiAndObjects/objects/peopleDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';

export class GetPeople extends CacheableEndpoint<Array<PeopleDataSource>, GetPeopleSourcesParams, PeopleDataSource> {
  protected getCacheKey(params: GetPeopleSourcesParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetPeopleSourcesParams): Promise<PeopleDataSource[]> {
    const callResponsePromise = this.apiCaller
      .doCall('person', RequestMethod.GET)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(PeopleDataSource, callResponsePromise);
  }

  protected callMock(): Promise<PeopleDataSource[]> {
    const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      PeopleDataSource,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(lastValueFrom(httpClient.get('/assets/data/software.json')));
        }, 100);
      }),
    );
  }

  private processResponseData(
    data: Array<Record<string, unknown>> | unknown,
    params: GetPeopleSourcesParams,
  ): Array<Record<string, unknown>> {
    if (Array.isArray(data)) {
      data.forEach((item: Record<string, unknown>, index: number) => (item['id'] = String(index).valueOf()));
      return params.singleOptionOnly === true ? data.slice(0, 1) : data;
    }
    return [{}];
  }
}

export interface GetPeopleSourcesParams {
  singleOptionOnly?: boolean;
  dataSource: PeopleDataSource;
}
