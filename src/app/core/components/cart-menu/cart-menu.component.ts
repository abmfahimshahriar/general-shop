import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrls: ['./cart-menu.component.scss']
})
export class CartMenuComponent implements OnInit {

  cart=[];
  cartTotal;
  noItems;
  constructor() { }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    console.log(this.cart);
    if (!this.cart) {
      this.noItems = true;
    }
    else {
      const total = this.cart.map(item => item.total);
      this.cartTotal = total.reduce((a, b) => a + b, 0);
      this.noItems = false;
    }
  }

}
