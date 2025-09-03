import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from "../components/button/button.component";
import { Routes } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  rememberMe: boolean = false;
  showPassword: boolean = false;
  loginForm!: FormGroup

  constructor(private cookie: CookieService, private service: LoginService, private fb: FormBuilder){
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
    })
  }

  // handleSubmit(formValue: any) {
  //   const loginData = {...formValue}
  //   if(this.formFields != null){
  //     this.service.getData(loginData).subscribe(data => {
  //       this.router.navigate(['/settings']);
  //       sessionStorage.setItem('token', data.token);
  //       sessionStorage.setItem('role', data.roles)
  //     })
  //   }else{
  //     alert('Invalid credentials');
  //   }
    
  // }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    const payload = {
      username: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    if(this.loginForm.invalid){
      return;
    }else if(this.loginForm.valid){
        this.service.getData(payload).subscribe(data => {
        this.router.navigate(['/settings']);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('role', data.roles)
      })
    }else{
      this.markFormGroupTouched();
      console.log('invalid')
    }
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  onForgotPassword(){
    this.router.navigate(['/forgot-password'])
  }

  onCreateAccount(){
    this.router.navigate(['/signup']);
  }

    // Reset the form
  resetForm(): void {
    this.loginForm.reset({
      email: '',
      password: '',
      rememberMe: false
    });
  }

    // Mark all form controls as touched to trigger validation messages
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Check if a field has validation errors
  hasError(controlName: string, errorType: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? control.hasError(errorType) && (control.touched) : false;
  }
}
