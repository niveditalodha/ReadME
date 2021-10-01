import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService extends BaseService<any> {
  private payload: any;
  constructor(private http: HttpClient) {
    super(http)
  }
  getPreferenceList(username: string | null): Observable<any> {

    this.payload = {
      "username": username
    };
    return this.post('https://readme17se.pythonanywhere.com/get-preferences', this.payload);


  }
}
