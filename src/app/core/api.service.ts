import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';

const API_HOST = '';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

  public sendPhoneVerificationCode<T>(credentials): Observable<T> {
    return this.http.post<T>(`${API_HOST}/phone_verification_code`, credentials);
  }

  public createSession<T>(credentials: any): Observable<T> {
    return this.http.post<T>(`${API_HOST}/session`, credentials);
  }

  public createFBSession<T>(credentials): Observable<T> {
    return this.http.post<T>(`${API_HOST}/facebook/session`, credentials);
  }

  public destroySession<T>(): Observable<T> {
    return this.http.delete<T>(`${API_HOST}/session`);
  }

  public getUser<T>(): Observable<T> {
    return this.http.get<T>(`${API_HOST}/user`);
  }

  public updateUser<T>(user): Observable<T> {
    return this.http.patch<T>(`${API_HOST}/user`, user);
  }

}
