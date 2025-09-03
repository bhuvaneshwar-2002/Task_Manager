import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { urlComponent } from '../url';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private cookie:CookieService,  private router: Router) { }

  url = new urlComponent().url;

  getData(UserData:any):Observable <any>{
    const Headers = {'content-type': 'application/json'}
    const body = JSON.stringify(UserData)
    return this.http.post(this.url +'auth'+'/login',body,{'headers':Headers})
  }



}
