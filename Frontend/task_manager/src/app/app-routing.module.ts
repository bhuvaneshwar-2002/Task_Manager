import { Path } from './../../node_modules/@angular/compiler-cli/node_modules/chokidar/esm/handler.d';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './auth/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { LoginComponent } from './login/login.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},// Accessible to all
  {
    path: 'settings', component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }// Only Admins can access this page
  },
  {path: 'unauthorized', component: UnauthorizedComponent}, // Unauthorized Page
  {path: '**', redirectTo: '/dashboard'}// Redirect unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthService,
    AuthGuard
  ]
})
export class AppRoutingModule { }
