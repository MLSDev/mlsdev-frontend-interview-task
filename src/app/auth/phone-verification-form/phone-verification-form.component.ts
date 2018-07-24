import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { catchError, tap } from 'rxjs/operators';

import { VerificationService } from '../shared/verification.service';
import { UserService, NotificationsService, SessionService } from '../../core';

@Component({
  selector: 'mls-phone-verification-form',
  templateUrl: 'phone-verification-form.component.html',
})
export class PhoneVerificationFormComponent {

  public phone: string = this.route.snapshot.queryParams.phone;

  public form: FormGroup = this.fb.group({
    code: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private session: SessionService,
    private verification: VerificationService,
    private notifications: NotificationsService,
  ) {}

  public completePhoneVerification(): void {
    return this
      .session
      .create({
        phone_number: this.phone,
        verification_code: this.form.get('code').value,
      })
      .pipe(
        tap((response) => {
          this.user.set(response.user);
          this.router.navigate(['']);
        }),
        catchError((error) => this.notifications.error(error)),
      )
      .subscribe();
  }

  public resendPhoneVerificationCode(): void {
    this
      .verification
      .sendPhoneVerificationCode(this.phone)
      .pipe(
        catchError((error) => this.notifications.error(error)),
      )
      .subscribe();
  }

}
