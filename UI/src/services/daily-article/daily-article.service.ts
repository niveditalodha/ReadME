import { Injectable } from '@angular/core';
import {BaseService} from "../base-service/base.service";
import {DailyArticleModel} from "../../models/daily-article.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DailyArticleService extends BaseService<DailyArticleModel>{

  constructor(private http: HttpClient) {
    super(http)
  }

  getDailyArticles(): Observable<DailyArticleModel>{
    return this.get('../../assets/sample-response/sampleResponse1.json');
  }
}
