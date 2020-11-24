import { OrderService } from './services/order.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrderListComponent } from './components/admin-order-list/admin-order-list.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AuthGuardService as AuthGuard } from '../core/services/auth-guard.service';
import { CoreModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SnackBarComponent } from '../shared/components/snack-bar/snack-bar.component';


@NgModule({
  declarations: [AdminOrderListComponent, MyOrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: 'admin/orders',
        component: AdminOrderListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  providers: [
    OrderService,
  ],
  entryComponents: [
    SnackBarComponent
  ]
})
export class OrderModule { }
