import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs/index';
import { mergeMap, delay } from 'rxjs/operators';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(() => {

      if (request.url.endsWith('/phone_verification_code') && request.method === 'POST') {
        return of(new HttpResponse({ status: 200 }));
      }

      if (request.url.endsWith('/user') && request.method === 'GET') {
        if (request.headers.get('Authorization') === 'Token token=123456789') {
          return of(new HttpResponse({
            status: 200,
            body: JSON.parse(localStorage.getItem('fake-user'))
          }));
        } else {
          return of(new HttpResponse({
            status: 401,
            body: 'Unauthorized!',
          }));
        }
      }

      if (request.url.endsWith('/session') && request.method === 'POST') {
        if (request.body.session.verification_code === '0000') {
          const user = {
            email: null,
            phone: request.body.session.phone_number,
          };

          localStorage.setItem('fake-user', JSON.stringify(user));

          return of(new HttpResponse({
             status: 200,
             body: {
               user,
               auth_token: '123456789'
             }
          }));
        } else {
          return throwError({ error: { verification_code: 'is invalid' } });
        }
      }

      return next.handle(request);
    }))
    .pipe(delay(500));
  }
}

export const backendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BackendInterceptor,
  multi: true
};
