import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from cookies
    const authToken = this.cookieService.get('auth_key');

    // If token exists, clone the request and add the Authorization header
    if (authToken) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` }
      });
    }

    // Handle the request and catch errors globally
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          console.error('Unauthorized access, redirecting to login...');
          this.router.navigate(['/login']); // Redirect to login if unauthorized
        }
        return throwError(() => error); // Re-throw the error
      })
    );
  }
}
