import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  isAuthenticate: boolean = false;

  constructor(private Cookie: CookieService, private router: Router) { }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    return this.isLoggedIn;
  }

  isAdmin(): boolean {
    const token = sessionStorage.getItem('token'); // Fetch token dynamically
    const role = sessionStorage.getItem('role');   // Fetch role dynamically

    return !!(token && role === 'ADMIN');  // Ensure both token and role are valid
  }
  
  logout() {
    sessionStorage.clear();
    this.isLoggedIn = false;  // Ensure logged-in state is updated
    this.isAuthenticate = false;
    this.router.navigate(['/']);
  }
}


