import { Observable } from 'rxjs';
import { urlComponent } from './../url';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  url = new urlComponent().url;

  constructor(private http: HttpClient) { }

  postUsers(userData: any):Observable <any>{
    const Headers = {'content-type': 'application/json'}
    const body = JSON.stringify(userData)
    return this.http.post(this.url +'auth'+'/register',body,{'headers':Headers})
  }

}
