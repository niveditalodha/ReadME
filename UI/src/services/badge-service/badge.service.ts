import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class BadgeService extends BaseService<any> {
  private payload: any;
  constructor(private http: HttpClient) {
    super(http)
  }
  getBadgeDetails(username: string | null): Observable<any> {

    this.payload = {
      "username": username
    };
    return this.post('https://readme17se.pythonanywhere.com/get-concept-badges', this.payload);

  }
}
