import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import {  SignupComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BodyComponent } from './body/body.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserServiceApiService } from './user-service-api.service';
import { Observable } from 'rxjs';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    Observable,
    HttpClient,
    Injectable,
    SignInComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    EmployeeListComponent,
    BodyComponent,
    UserServiceApiService,
    FooterComponent,
    PageNotFoundComponent,
    CustomAlertComponent
  ]
})
export class AppModule { }
