import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { TestComponent } from './components/test/test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    TestComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [
    TestComponent,
    SnackBarComponent
  ]
})
export class SharedModule { }
