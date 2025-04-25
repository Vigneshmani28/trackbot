import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { AuthorizationHttpInterceptor } from './common/AuthorizationHttpInterceptor';
import { HasRoleDirective } from './Directives/has-role.directive';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomeComponent,
    LoginComponent,
    SharedModule
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},   
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationHttpInterceptor, multi: true }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
