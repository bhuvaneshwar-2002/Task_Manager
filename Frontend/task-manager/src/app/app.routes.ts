import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { adminGuard } from './auth/admin.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SignupComponent } from './login/addons/signup/signup.component';
import { ForgotPasswordComponent } from './login/addons/forgot-password/forgot-password.component';

export const routes: Routes = [
    {path: '',component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'settings',title: 'Settings' , component: SettingsComponent, canActivate: [adminGuard] },
    {path: 'config',title: 'Configuration' , component: ConfigurationComponent, canActivate: [authGuard] },
    {path: 'unauthorized', component: UnauthorizedComponent}
];
