import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import { FirstPageComponent } from "../store/containers/first-page/first-page.component";
import { LogoutPageComponent } from "../store/containers/logout-page/logout-page.component";
import { LoginPageComponent } from "../store/containers/login-page/login-page.component";
import { SecondPageComponent } from "../store/containers/second-page/second-page.component";
import { ThirdPageComponent } from "../store/containers/third-page/third-page.component"
import { FourthPageComponent } from "../store/containers/fourth-page/fourth-page.component";




const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {path: 'first',  component: FirstPageComponent},
  { path: 'second', component: SecondPageComponent },
  { path: 'third', component: ThirdPageComponent },
  { path: 'fourth', component: FourthPageComponent },
  { path: 'logout', component: LogoutPageComponent },
  { path: '**', component: LoginPageComponent },
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],

  exports: [RouterModule]

})
export class AppRoutingModuleModule { }
