import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { backendProvider } from './backend.interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    backendProvider
  ]
})
export class BackendModule {}
