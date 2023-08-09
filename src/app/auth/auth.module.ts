import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRougintModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
 
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    AppRougintModule,
    MaterialModule
  ]
})
export class AuthModule { }
