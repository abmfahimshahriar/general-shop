import { ProductService } from './services/product.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SnackBarComponent } from './../shared/components/snack-bar/snack-bar.component';
import { SharedModule } from './../shared/shared.module';
import { AuthenticationService } from './services/authentication.service';
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
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    ToolBarComponent,
    SideNavComponent,
    AuthModalComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
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
    MatDividerModule,
    MatCardModule,
    HttpClientModule,
  ],
  exports: [
    ToolBarComponent,
    SideNavComponent
  ],
  providers: [
    SideNavService,
    AuthenticationService,
    AuthGuardService,
    ProductService
  ],
  entryComponents : [
    AuthModalComponent,
    SnackBarComponent
  ]
})
export class CoreModule { }
