import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HttpError } from 'src/utility/objects/httpError';
import { AaaiService } from 'src/aaai/aaai.service';
import { SnackbarService } from 'src/services/snackbar.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly aaai: AaaiService, private snackbarService: SnackbarService) {
    //
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: () => {
          // do nothing
        },
        error: (exception) => {
          if (exception instanceof HttpErrorResponse) {
            switch (exception.status) {
              case HttpError.BadRequest:
                this.snackbarService.openSnackbar(
                  'API request was unsuccessful. Please try again later.',
                  'Close',
                  'error',
                  3000,
                );
                console.error(exception.message);
                break;
              case HttpError.Unauthorized:
                this.snackbarService.openSnackbar(
                  'Your session has expired. Please log in again.',
                  'Close',
                  'warning',
                  3000,
                );
                this.aaai.logout();
                break;
            }
          }
        },
      }),
    );
  }
}
