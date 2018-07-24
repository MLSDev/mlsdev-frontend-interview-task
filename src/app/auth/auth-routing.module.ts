import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthPageComponent } from './auth-page.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { PhoneFormComponent } from './phone-form/phone-form.component';
import { PhoneVerificationFormComponent } from './phone-verification-form/phone-verification-form.component';

import { UnauthenticatedGuard } from '../core/guards/unauthenticated-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent,
    canActivate: [UnauthenticatedGuard],
    children: [
      { path: '', component: LogInFormComponent },
      { path: 'phone-verification', component: PhoneVerificationFormComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
