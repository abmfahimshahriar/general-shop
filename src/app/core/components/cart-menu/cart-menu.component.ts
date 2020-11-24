import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../store';

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrls: ['./cart-menu.component.scss']
})
export class CartMenuComponent implements OnInit, OnDestroy {

  cart;
  cartTotal;
  noItems;
  reduxSubscription;
  constructor(
    private ngRedux: NgRedux<IAppState>,
  ) {
    this.reduxSubscription = this.ngRedux.subscribe(() => {
      this.cart = this.ngRedux.getState().cart;
      const total = this.cart.map(item => item.total);
      this.cartTotal = total.reduce((a, b) => a + b, 0);
      this.noItems = false;
    });
  }

  ngOnInit(): void {
    if (!this.cart) {
      this.noItems = true;
    }

  }

  ngOnDestroy() {
    this.reduxSubscription.unsubscribe();
  }


}
