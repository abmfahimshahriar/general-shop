import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SideNavService } from './services/side-nav.service';
import { RouterModule } from '@angular/router';
import { TestComponent } from '../shared/components/test/test.component';


@NgModule({
  declarations: [
    ToolBarComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    // RouterModule.forChild([
    //   {path: 'test' , component: TestComponent },
    // ]),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule
  ],
  exports: [
    ToolBarComponent,
    SideNavComponent
  ],
  providers: [
    SideNavService
  ]
})
export class CoreModule { }
