import { Injectable } from '@angular/core';
import * as store from 'store-js/dist/store.modern';

import { BehaviorSubject, Observable, throwError } from 'rxjs/index';
import { catchError, tap, skip, map, switchMap } from 'rxjs/operators';

import { ApiService } from './api.service';

const STORAGE_KEY = 'token';
const FACEBOOK_OPTIONS = { scope: 'public_profile,email' };

type Token = string;

export interface ISessionCredentials {
  phone_number: string;
  verification_code: string;
}

export interface ISessionSource {
  auth_token: Token;
  [key: string]: any;
}

@Injectable()
export class SessionService {

  private token: BehaviorSubject<Token> = new BehaviorSubject<Token>(this.getToken());

  public token$: Observable<Token> = this.token.asObservable();
  public exists$: Observable<boolean> = this.token$.pipe(map((token) => !!token));

  constructor(private api: ApiService) {
    this.token.pipe(skip(1)).subscribe(this.handleToken.bind(this));
  }

  public create(credentials: ISessionCredentials): Observable<ISessionSource> {
    return this
      .api
      .createSession<ISessionSource>({ session: credentials })
      .pipe(
        tap((response) => this.token.next(response.auth_token)),
        catchError((response) => throwError(response.error))
      );
  }

  public createViaFacebook(): Observable<ISessionSource> {
    return this
      .getFacebookToken()
      .pipe(
        switchMap((facebook_token) => {
          return this.api.createFBSession<ISessionSource>({ facebook_token });
        }),
        tap((response) => this.token.next(response.auth_token)),
        catchError((response) => throwError(response.error)),
      );
  }

  public destroy(): Observable<void> {
    return this
      .api
      .destroySession<void>()
      .pipe(
        tap(() => this.clear())
      );
  }

  public clear(): void {
    this.token.next(null);
  }

  private getFacebookToken(): Observable<string> {
    return Observable.create((observer) => {
      FB.login(({ status, authResponse }) => {
        status === 'connected' ? observer.next(authResponse.accessToken) : observer.error({ error: null });
        observer.complete();
      }, FACEBOOK_OPTIONS);
    });
  }

  private getToken(): Token {
    return store.get(STORAGE_KEY);
  }

  private handleToken(token: Token): void {
    token ? this.saveToken(token) : this.removeToken();
  }

  private saveToken(token: Token): void {
    store.set(STORAGE_KEY, token);
  }

  private removeToken(): void {
    store.remove(STORAGE_KEY);
  }

}
