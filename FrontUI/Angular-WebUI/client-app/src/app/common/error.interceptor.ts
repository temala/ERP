import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let message = 'An unexpected error occurred';

        if (error.status === 0) {
          message = 'Unable to connect to the server. Please check your connection.';
        } else if (error.status === 401) {
          message = 'Your session has expired. Please log in again.';
          this.router.navigate(['/authentication/login']);
        } else if (error.status === 403) {
          message = 'You do not have permission to perform this action.';
        } else if (error.status === 404) {
          message = 'The requested resource was not found.';
        } else if (error.status === 429) {
          message = 'Too many requests. Please try again later.';
        } else if (error.status >= 500) {
          message = 'A server error occurred. Please try again later.';
        } else if (error.error?.title) {
          message = error.error.title;
        }

        this.snackBar.open(message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });

        return throwError(() => error);
      })
    );
  }
}
