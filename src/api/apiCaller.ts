import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RequestMethod } from "./requestMethod.enum";

@Injectable({
  providedIn: 'root'
})
export class ApiCaller {
  private headers = new HttpHeaders();

  private apiUrl: string = 'http://ics-c.epos-ip.org/demo/k8s-epos-deploy/operational-testing/api/backoffice-service/v1';
  private mockUrl: string = environment.server + '/assets/data';

  constructor(private http: HttpClient) {}

  public doCall(
    urlSegments: string | Array<string>,
    requestMethod: RequestMethod,
    queryParams: Record<string, string | Array<string>> = {},
    bodyData: Record<string, unknown | FormData | Array<unknown>> = {},
    headerFilter?: (headers: HttpHeaders) => HttpHeaders,
  ): Promise<unknown> {

    const url = this.getUrl(urlSegments, this.apiUrl);
    const options = {
      headers: null != headerFilter ? headerFilter(this.headers) : this.headers,
      params: queryParams,
    };

    let response: Observable<unknown>;
    switch (requestMethod) {
      case RequestMethod.GET:
        response = this.http.get(url, options);
        break;
      case RequestMethod.DELETE:
        response = this.http.delete(url, options);
        break;
      case RequestMethod.POST:
        response = this.http.post(url, bodyData, options);
        break;
      case RequestMethod.PATCH:
        response = this.http.patch(url, bodyData, options);
        break;
      case RequestMethod.PUT:
        response = this.http.put(url, bodyData, options);
        break;
    }

    response.subscribe({
      next: () => { return lastValueFrom(response);;},
      error: () => { return this.getMockData(urlSegments ,queryParams); }
    })

    return this.getMockData(urlSegments ,queryParams);
  }

  private getUrl(segments: string | Array<string>, baseUrl: string): string {
    segments = Array.isArray(segments) ? segments : [segments];

    const url = `${baseUrl}/${segments.join('/')}`;
    return url;
  }

  private getMockData(urlSegments: string | Array<string>, options: any): Promise<unknown> {
    const url = this.getUrl(urlSegments, this.mockUrl) + ".json";
    return lastValueFrom(this.http.get(url, options));
  }
}
