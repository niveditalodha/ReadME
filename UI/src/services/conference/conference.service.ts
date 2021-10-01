import { Injectable } from '@angular/core';
import {BaseService} from "../base-service/base.service";
import {ConferenceModel} from "../../models/conference.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConferenceService extends BaseService<ConferenceModel[]>{

  constructor(private http: HttpClient) {
    super(http);
  }

  getUserConferences(): Observable<ConferenceModel[]>{
    return this.get('../../assets/sample-response/user-conferences.json')
  }

  getUpcomingUserConferences(): Observable<ConferenceModel[]>{
    return this.get('../../assets/sample-response/upcoming-user-conferences.json')
  }
}
