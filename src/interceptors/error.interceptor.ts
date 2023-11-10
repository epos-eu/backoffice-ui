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
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('Client side error...');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('Server side error...');
          errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
          if (error.status === HttpStatusCode.NotFound) {
            this.router.navigate(['/error']);
          }
        }
        return throwError(errorMsg);
      }),
    );
  }
}
