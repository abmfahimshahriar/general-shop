import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit {
  cart;
  displayedColumns: string[] = ['title', 'count','unitPrice', 'total'];
  totalCost;
  constructor() { }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.getTotalCost();
  }

  onCart(prodId, type) {
    const cartItem = {
      prodId: prodId,
      type: type
    }
    this.cartManager(cartItem);
  }

  cartManager(cartItem) {
    let num = 1;
    if (cartItem.type === 'remove') {
      num = -1;
    }
    let tempCart = [...this.cart];
    let tempItem: any = tempCart
      .find(item => item._id === cartItem.prodId);

    tempItem.count = tempItem.count + num;
    if (tempItem.count === 0) {
      tempCart = tempCart.filter(item => item._id !== tempItem._id);
    }
    else {
      tempItem.total = tempItem.price * tempItem.count;
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
    }
    this.cart = [...tempCart];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.getTotalCost();
  }

  getTotalCost() {
    const total = this.cart.map(item => item.total);
    this.totalCost = total.reduce((a, b) => a + b, 0);
  }

}
