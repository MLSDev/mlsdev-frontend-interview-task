import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { catchError, tap } from 'rxjs/operators';

import { VerificationService } from '../shared/verification.service';
import { UserService, SessionService, NotificationsService } from '../../core';

@Component({
  selector: 'mls-log-in-form',
  templateUrl: 'log-in-form.component.html',
  styleUrls: ['log-in-form.component.styl']
})
export class LogInFormComponent {

  public form: FormGroup = this.fb.group({
    phone: [
      '',
      [Validators.required]
    ],
  });

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private user: UserService,
      private session: SessionService,
      private verification: VerificationService,
      private notifications: NotificationsService,
  ) {}

  public goToPhoneVerification(): void {
    const phone = this.form.get('phone').value;

    this
      .verification
      .sendPhoneVerificationCode(phone)
      .pipe(
        tap(() => {
          this.router.navigate(['/auth/phone-verification'], { queryParams: { phone } });
        }),
        catchError((error) => this.notifications.error(error)),
      )
      .subscribe();
  }

}
