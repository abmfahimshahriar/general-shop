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

  pageLimit = 5;
  pageNumber = 0;
  searchKey;
  loading = true;
  noItem = false;
  paginatorProperties = {
    length: 100,
    pageSize: 5,
    pageSizeOptions: [5, 10, 25, 100],
  }
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
  
  async getOrders() {
    const payload = {
      pageNumber: this.pageNumber,
      pageLimit: this.pageLimit,
      searchKey: this.searchKey ? this.searchKey : null
    }
    this.subscription = this.orderService.getAllOrders(payload).subscribe((data: any) => {
      this.orders = data.orders;
      this.paginatorProperties.length = data.totalItems;
      this.loading = false;
      this.noItem = data.totalItems > 0 ? false : true;
    });
  }

  changeOrderStatus(orderId) {
    this.subscription = this.orderService.changeOrderStatus(orderId)
      .subscribe((data: any) => {
        this.openSnackBar(data);
        this.getOrders();
      });
  }

  onDeleteOrder(orderId) {
    this.subscription = this.orderService.deleteOrder(orderId)
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

  pageEvent(event) {
    this.pageNumber = event.pageIndex;
    this.pageLimit = event.pageSize;
    this.paginatorProperties.pageSize = event.pageSize;
    this.loading = true;
    this.getOrders();
  }

  filter(searchKey) {
    this.searchKey = searchKey;
    this.loading = true;
    this.getOrders();
  }

}
