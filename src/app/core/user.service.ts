import { Injectable } from '@angular/core';

import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of, ReplaySubject, Subject, throwError } from 'rxjs/index';

import { ApiService } from './api.service';

const AVATAR_PLACEHOLDER = 'photos/middle/missing.png';

export interface IUserProfile {
  id?: number;
  email?: string;
  phone?: string;
  points?: number;
  avatar?: string | File;
  [key: string]: any;
}

export const DEFAULT_USER_PROFILE: IUserProfile = {
  id: null,
  email: '',
  phone: '',
  points: 0,
  avatar: AVATAR_PLACEHOLDER,
};

@Injectable()
export class UserService {

  private profile: Subject<IUserProfile> = new ReplaySubject(1);

  public profile$: Observable<IUserProfile> = this.profile.asObservable();

  public isAuthenticated$: Observable<boolean> = this.profile$.pipe(map((profile) => {
    return !!profile.phone;
  }));

  constructor(private api: ApiService) {}

  public initialize(identified: boolean): Observable<void> {
    return (identified ? this.load() : of(DEFAULT_USER_PROFILE)).pipe(
      map((profile) => this.set(profile))
    );
  }

  public set(profile: IUserProfile): void {
    this.profile.next(profile);
  }

  public reset(): void {
    this.set(DEFAULT_USER_PROFILE);
  }

  private load(): Observable<IUserProfile> {
    return this
      .api
      .getUser()
      .pipe(
        catchError((response) => throwError(response.error))
      );
  }

  private update(user: IUserProfile): Observable<IUserProfile> {
    return this
      .api
      .updateUser<IUserProfile>({ user })
      .pipe(
        tap((profile) => this.set(profile)),
        catchError((response) => throwError(response.error)),
      );
  }

}
