import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { CreditcardsComponent } from './pages/creditcard/creditcards/creditcards.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbSidebarService,NbThemeModule, NbLayoutModule, NbCardModule, NbIconModule, NbStepperModule, NbAlertModule, NbButtonModule, NbInputModule, NbMenuModule, NbTreeGridModule, NbCheckboxModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './pages/creditcard/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAuthModule } from '@nebular/auth';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    PagesComponent,
    CreditcardsComponent,
    FormComponent
  ],
  imports: [
    NbToastrModule.forRoot(),
    NbIconModule,
    NbButtonModule,
    NbStepperModule,
    NbAlertModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SmartTableModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbAuthModule,
    NbMenuModule,
    NbTreeGridModule,
    FormsModule,
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
