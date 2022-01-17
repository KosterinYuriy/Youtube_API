import { NgModule } from '@angular/core';


import {BoardComponent} from "./board.component";


@NgModule({

  imports: [

  ],

  declarations: [
    BoardComponent,
  ],
  exports: [ BoardComponent ],
  providers: []
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})

export class BoardModule { }

