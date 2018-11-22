import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { TenantsComponent } from './Components/tenants/tenants.component';
import { HttpClientModule } from '@angular/common/http';

import { TenantPipe } from './Pipes/tenantsPipe'

@NgModule({
  declarations: [
    AppComponent,
    TenantsComponent,
    RegisterComponent,
    LoginComponent,
    TenantPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
