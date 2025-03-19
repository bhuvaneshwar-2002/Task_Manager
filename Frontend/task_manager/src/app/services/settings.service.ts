import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { urlComponent } from '../url';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  url = new urlComponent().url

  auth:any;

  getProtectedData(): Observable<any> {
    return this.http.get(this.url); // No need to add Authorization manually!
  }



}
