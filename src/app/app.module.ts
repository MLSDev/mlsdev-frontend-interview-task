import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AuthModule } from './auth';
import { CoreModule } from './core';
import { AppRoutingModule } from './app-routing.module';
import { BackendModule } from './backend/backend.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    AuthModule,
    BackendModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
