import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';  // ✅ Import provideHttpClient
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // ✅ Fix: Provides HttpClient
    provideRouter(routes),
    CookieService  // ✅ Also provide CookieService
  ]
})
  .catch(err => console.error(err));
