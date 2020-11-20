import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuardService as AuthGuard } from '../core/services/auth-guard.service';



@NgModule({
  declarations: [
    ShoppingCartComponent,
    CartTableComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard]
      }
    ])
  ]
})
export class ShoppingModule { }
