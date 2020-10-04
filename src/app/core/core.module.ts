import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SideNavService } from './services/side-nav.service';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [
    ToolBarComponent,
    SideNavComponent,
    AuthModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  exports: [
    ToolBarComponent,
    SideNavComponent
  ],
  providers: [
    SideNavService
  ],
  entryComponents : [
    AuthModalComponent
  ]
})
export class CoreModule { }
