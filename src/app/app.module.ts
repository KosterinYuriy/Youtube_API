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
import { AppRoutingModuleModule } from "./app-routing-module/app-routing-module.module";
import { LoginPageComponent } from './store/containers/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { VideosFormComponent } from './components/videos-form/videos-form.component';
import {SecondPageComponent} from "./store/containers/second-page/second-page.component";

import {GoogleLoginProvider, SocialLoginModule} from "angularx-social-login";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ModalModule } from "./components/modal";
import {AuthGuardService} from "./store/services/AuthGuard.service";


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
      { path: 'login', component: LoginPageComponent},
      { path: 'first', component: FirstPageComponent, canActivate: [AuthGuardService]},
      { path: 'second', component: SecondPageComponent, canActivate: [AuthGuardService] },
      { path: 'third', component: ThirdPageComponent, canActivate: [AuthGuardService]},
      { path: 'fourth', component: FourthPageComponent, canActivate: [AuthGuardService]},
      { path: 'logout', component: LogoutPageComponent, canActivate: [AuthGuardService] },
      { path: '**', component: LoginPageComponent },
    ]),
    StoreRouterConnectingModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    ModalModule
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
    VideosFormComponent,
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

