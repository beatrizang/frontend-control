import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonasComponent } from './componentes/personas/personas.component';
import { FormPersonasComponent } from './componentes/form-personas/form-personas.component';

import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './componentes/paginator/paginator.component';
import { HeaderComponent } from './componentes/header/header.component';
import { LoginComponent } from './componentes/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ControlesComponent } from './componentes/controles/controles.component';
import { FormControlComponent } from './componentes/form-control/form-control.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    FormPersonasComponent,
    PaginatorComponent,
    HeaderComponent,
    LoginComponent,
    ControlesComponent,
    FormControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
