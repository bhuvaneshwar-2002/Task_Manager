import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { urlComponent } from '../url';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = new urlComponent().url
  private loginUrl = this.url + 'auth/login';
    // Replace with your backend login API

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  // ✅ Login function: Sends username, password, and role to the backend
  login(username: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<{ token: string, roles: string }>(this.loginUrl, { username, password })
        .subscribe(response => {
          // Store auth token and role in cookies
          this.cookieService.set('auth_key', response.token, { path: '/' });
          this.cookieService.set('user_role', response.roles, { path: '/' });

          observer.next(response);
          observer.complete();
        }, error => observer.error(error));
    });
  }

  // ✅ Get the stored user role from cookies
  getUserRole(): string {
    return this.cookieService.get('user_role');
  }

  // ✅ Get the stored auth token from cookies
  getAuthToken(): string {
    return this.cookieService.get('auth_key');
  }

  // ✅ Logout: Clears stored token and role
  logout() {
    this.cookieService.delete('auth_key', '/');
    this.cookieService.delete('user_role', '/');
    this.router.navigate(['/']);
    console.log('User logged out');
  }

  // ✅ Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}
