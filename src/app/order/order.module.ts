import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrderListComponent } from './components/admin-order-list/admin-order-list.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';



@NgModule({
  declarations: [AdminOrderListComponent, MyOrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class OrderModule { }
