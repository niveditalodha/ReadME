import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";



@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    // console.log('request url', request.url)
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.errorHandling(err.status);
      }
    }));
  }

  errorHandling(errorStatus: any){
    switch(errorStatus){
      case 401:
        this.router.navigate(['/login']);
        break;
      case 500:
        console.log('Internal Server Error');
        break;
      case 404:
        console.log('Data not found');
        break;
      case 0:
        this.router.navigate(['/login']);
        break;
    }
  }
}
