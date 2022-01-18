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
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/compiler";


// import {BoardModule} from "./components/board/board.module";




@NgModule({

    imports: [
        BrowserModule,
        //BoardModule,
        AppRoutingModuleModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot( {

        }),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
        EffectsModule.forRoot([AppEffects]),
        RouterModule,
        StoreRouterConnectingModule.forRoot(),
        ReactiveFormsModule
    ],

  declarations: [
    AppComponent,
    BoardComponent,
    ThirdPageComponent,
    FourthPageComponent,
    LogoutPageComponent,
    FirstPageComponent,
    LoginPageComponent,
  ],

  providers: [HttpClientModule],
  bootstrap: [AppComponent],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }

