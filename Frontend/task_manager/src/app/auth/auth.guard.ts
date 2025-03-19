import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = this.authService.getUserRole();
    const requiredRole = route.data['role'];
    console.log(userRole)

    if (userRole) {
      return true; // Grant access
    } else {
      this.router.navigate(['/unauthorized']); // Redirect if unauthorized
      return false;
    }
  }
}
