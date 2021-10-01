import { Injectable } from '@angular/core';
import {BaseService} from "../base-service/base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReturningUserService extends BaseService<any>{

  private _url!: string;
  private _payload!: { user_email: string; name: string; username: string };

  constructor(private http: HttpClient) {
    super(http)
  }

  checkReturningUser(name: string, email: string): Observable<any>{
    this._url = 'https://readme17se.pythonanywhere.com';
    let username = email.split('@');
    this._payload = {
      "name":name,
      "user_email": email,
      "username": username[0]
    };
    return this.post(this._url, this._payload);
  }
}
