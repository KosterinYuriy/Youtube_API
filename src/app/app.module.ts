import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {RouterModule} from "@angular/router";
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import {BoardComponent} from "./components/board/board.component";

import { ThirdPageComponent } from "./store/containers/third-page/third-page.component";
import { FourthPageComponent } from "./store/containers/fourth-page/fourth-page.component";
import { LogoutPageComponent } from "./store/containers/logout-page/logout-page.component";
import { FirstPageComponent } from "./store/containers/first-page/first-page.component";
import { LoginPageComponent } from './store/containers/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import {SecondPageComponent} from "./store/containers/second-page/second-page.component";

import {GoogleLoginProvider, SocialLoginModule} from "angularx-social-login";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {AuthGuardService} from "./store/services/AuthGuard.service";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {UpdateChannelDescriptionForm} from "./components/angular-material-modal/angular-modal.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";


@NgModule({

    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot({}
        ),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
        EffectsModule.forRoot([AppEffects]),
        RouterModule.forRoot([
            {path: 'login', component: LoginPageComponent},
            {path: 'home', component: FirstPageComponent, canActivate: [AuthGuardService]},
            {path: 'second', component: SecondPageComponent, canActivate: [AuthGuardService]},
            {path: 'third', component: ThirdPageComponent, canActivate: [AuthGuardService]},
            {path: 'profile', component: FourthPageComponent, canActivate: [AuthGuardService]},
            {path: 'logout', component: LogoutPageComponent, canActivate: [AuthGuardService]},
            {path: '**', component: LoginPageComponent},
        ]),
        StoreRouterConnectingModule.forRoot(),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SocialLoginModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatDialogModule,
        MatCardModule,
    ],

  declarations: [
    AppComponent,
    BoardComponent,
    SecondPageComponent,
    ThirdPageComponent,
    FourthPageComponent,
    LogoutPageComponent,
    FirstPageComponent,
    LoginPageComponent,
    UpdateChannelDescriptionForm
  ],

  providers: [
    HttpClientModule,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('972008513630-7avvlobhv10on2p03ibejru0vqlhgk9t.apps.googleusercontent.com')
          }
        ]
      }
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
