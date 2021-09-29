import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T>{

  constructor(private httpClient: HttpClient) { }

  private get(url: string): Observable<T>{
    return this.httpClient.get<T>(url).pipe(map(res => res as T));
  }


  private post(url: string, body: T ){
    return this.httpClient.post<T>(url, body).pipe(map(res => res as T));
  }

}
