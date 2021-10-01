import { Injectable } from '@angular/core';
import {BaseService} from "../returning-user/base-service/base.service";
import {DailyArticleModel} from "../../models/daily-article.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DailyArticleService extends BaseService<any>{

  private payload: any;

  constructor(private http: HttpClient) {
    super(http)
  }

  getDailyArticles(): Observable<any>{

    // this.payload = {
    //   "username":"nnlodha"
    // };
    // return this.post('https://readme17se.pythonanywhere.com/get-sent-articles', this.payload);


    // return this.post('https://readme17se.pythonanywhere.com/get-random-articles', {});


    // this.payload = {
    //   "name":"Nivedita Lodha",
    //   "user_email":"nnlodha@ncsu.edu",
    //   "username":"nnlodha"
    // };
    // return this.post('https://readme17se.pythonanywhere.com', this.payload);


    // this.payload = {
    //   "username":"nnlodha",
    //   "sent_article_id": 2
    // };
    // return this.post('https://readme17se.pythonanywhere.com/update-read-flag', this.payload);


    // this.payload = {
    //   "username":"nnlodha",
    //   "preferences": [
    //     {
    //       "concept_id": "5",
    //       "concept_name": "concept5"
    //     },
    //     {
    //       "concept_id": "8",
    //       "concept_name": "concept8"
    //     }
    //   ]
    // };
    // return this.post('https://readme17se.pythonanywhere.com/update-preferences', this.payload);



    // this.payload = {
    //   "username":"nnlodha"
    // };
    // return this.post('https://readme17se.pythonanywhere.com/get-preferences', this.payload);


    // this.payload = {
    //   "username":"nnlodha"
    // };
    // return this.post('https://readme17se.pythonanywhere.com/get-concept-badges', this.payload);

    return this.get('../../assets/sample-response/sampleResponse1.json');
  }
}
