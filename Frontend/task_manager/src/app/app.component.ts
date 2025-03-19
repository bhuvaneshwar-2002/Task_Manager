import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task Manager';
  constructor(private authService: AuthService,private router: Router) {}

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'ADMIN';
  }

  logout() {
    this.authService.logout();
  }

  public getRouter(): Router {
    return this.router;
  }
}
