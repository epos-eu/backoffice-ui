/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogService } from 'src/services/log.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private logger: LogService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          this.logger.warn('Client side error.');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          this.logger.warn('Server side error.');
          errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
          if (error.status === HttpStatusCode.NotFound) {
            // this.router.navigate(['/error']);
          }
        }
        return throwError(errorMsg);
      }),
    );
  }
}
