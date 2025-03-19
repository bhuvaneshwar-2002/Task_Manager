import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports.component';
import { InputComponent } from './components/input/input.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TableComponent } from './components/table/table.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ChartsComponent } from './components/charts/charts.component';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { ButtonComponent } from './components/button/button.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor'; 
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login/login.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettingsComponent,
    ReportsComponent,
    InputComponent,
    DropdownComponent,
    TableComponent,
    ProgressBarComponent,
    ChartsComponent,
    ButtonComponent,
    LoginComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule, 
    HighchartsChartModule,
  ],
  providers: [CookieService,
    {provide: HTTP_INTERCEPTORS,useClass: JwtInterceptor, multi: true},
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add this to suppress unknown element errors
  bootstrap: [AppComponent]
})
export class AppModule { }
