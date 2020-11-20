import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartTableComponent } from './components/cart-table/cart-table.component';



@NgModule({
  declarations: [
    ShoppingCartComponent,
    CartTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent
      }
    ])
  ]
})
export class ShoppingModule { }
