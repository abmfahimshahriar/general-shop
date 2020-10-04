import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    ToolBarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    ToolBarComponent
  ]
})
export class CoreModule { }
