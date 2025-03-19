import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task Manager';
  constructor(private authService: AuthService) {}

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'ADMIN';
  }

  logout() {
    this.authService.logout();
  }
}
