import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookButtonComponent } from './facebook-button/facebook-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FacebookButtonComponent
  ],
  exports: [
    FacebookButtonComponent
  ]
})
export class SharedModule { }
