import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../components/button/button.component";
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { InputComponent } from '../components/input/input.component';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ButtonComponent, InputComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor(private cookie: CookieService, private service: SettingsService, private authService: AuthService){}

  formFields = [
    { name: 'username', label: 'Username', type: 'text', validators: [Validators.required] },
    { name: 'password', label: 'Password', type: 'password', validators: [Validators.required] },
    { name: 'role', label: 'Role', type: 'text', validators: [Validators.required] }
  ];
  
ngOnInit(){}


submit(formValue: any) {
  const post = {
    ...formValue,
    roles: [formValue.role]
  };
  
  delete post.role;

  this.service.postUsers(post).subscribe(() => {
    this.router.navigate(['/']);
  });

  console.log(post, 'Sent Data');
}


  logout(){
    this.authService.logout();
  }

  config(){
    this.router.navigate(['/config']);
  }
}


