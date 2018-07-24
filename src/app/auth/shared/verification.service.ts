import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from '../../core';

@Injectable()
export class VerificationService {

  constructor(private api: ApiService) {}

  public sendPhoneVerificationCode(phone: string): Observable<void> {
    return this
      .api
      .sendPhoneVerificationCode<void>({
        verification_code: { phone_number: phone }
      })
      .pipe(catchError((response) => throwError(response.error)));
  }

}
