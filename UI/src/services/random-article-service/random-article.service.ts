import { Injectable } from '@angular/core';
import {BaseService} from "../base-service/base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RandomArticleModel} from "../../models/random-article.model";

@Injectable({
  providedIn: 'root'
})
export class RandomArticleService extends BaseService<RandomArticleModel[]>{

  constructor(private http: HttpClient) {
    super(http);
  }

  getRandomArticles():Observable<RandomArticleModel[]>{
    return this.postAny('https://readme17se.pythonanywhere.com/get-random-articles', {});
  }
}
