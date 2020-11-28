import { Subscription } from 'rxjs';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  myOrders;
  subscription: Subscription;
  displayedColumns: string[] = ['products', 'total', 'status'];
  loading = true;
  noItem = false;
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders() {
    const storageData = JSON.parse(localStorage.getItem('userData'));
    const userId = storageData.userData.userId;
    this.subscription = this.orderService.getMyOrders(userId).subscribe((data: any) => {
      this.myOrders = data.orders;
      this.loading = false;
      this.noItem = data.totalItems > 0 ? false : true;
    });
  }
}
