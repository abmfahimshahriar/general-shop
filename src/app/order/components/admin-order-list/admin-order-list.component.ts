import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})
export class AdminOrderListComponent implements OnInit {

  orders;
  subscription: Subscription;
  Search: FormControl;
  constructor(
    private orderService: OrderService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getOrders() {
    this.subscription = this.orderService.getAllOrders().subscribe((data: any) => {
      this.orders = data.orders;
      console.log(this.orders);
    });
  }

  changeOrderStatus(orderId) {
    this.subscription = this.orderService.changeOrderStatus(orderId)
      .subscribe((data: any) => {
        this.openSnackBar(data);
        this.getOrders();
      });
  }

  openSnackBar(data) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {
        message: data.message
      },

    });
  }

}
