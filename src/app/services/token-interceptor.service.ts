import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { exemptURLs } from 'src/global constants/exemptURLs';
@Injectable()

export class TokenInterceptorService implements HttpInterceptor{
  constructor(public auth: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get('Anonymous') == 'skip') {
      const newHeaders = request.headers.delete('Anonymous')
      const newRequest = request.clone({ headers: newHeaders });
      return next.handle(newRequest);
    }

    if(!exemptURLs.includes(request.url)){
      request = request.clone({ headers: request.headers.set('Authorization',`Bearer ${this.auth.getToken()}`) });
    }
    
    console.log(this.auth.getToken())

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              console.log('event--->>>', event);
          }
          return event;
      }));
  }
}
