import { CoreModule } from './../core/core.module';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { TestComponent } from './components/test/test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    TestComponent,
    SnackBarComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule
  ],
  exports: [
    TestComponent,
    SnackBarComponent,
    ProductCardComponent,
    MatCardModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule
  ]
})
export class SharedModule { }
