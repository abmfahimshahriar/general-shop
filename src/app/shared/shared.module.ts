import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';


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
    MatTableModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatPaginatorModule,
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
    MatMenuModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
