import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared';
import { VerificationService } from './shared/verification.service';

import { AuthPageComponent } from './auth-page.component';
import { PhoneFormComponent } from './phone-form/phone-form.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { PhoneVerificationFormComponent } from './phone-verification-form/phone-verification-form.component';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  providers: [
    VerificationService,
  ],
  declarations: [
    AuthPageComponent,
    LogInFormComponent,
    PhoneFormComponent,
    PhoneVerificationFormComponent,
  ]
})
export class AuthModule {}
