import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: any[];
  cart: any[] = [];
  subscription: Subscription;
  constructor(
    private productService: ProductService
  ) {
    this.subscription = this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data.products;
    })
  }

  ngOnInit(): void {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      this.cart = cart;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cartManager(cartItem) {
    let num = 1;
    if (cartItem.type === 'remove') {
      num = -1;
    }
    let tempCart = [...this.cart];
    let tempItem: any = tempCart
      .find(item => item._id === cartItem.prodId);
    console.log(tempItem);

    if (!tempItem) {
      if (cartItem.type !== 'remove') {
        tempItem = this.products
          .find(item => item._id === cartItem.prodId);
        const total = tempItem.price;
        const item = {
          ...tempItem,
          total,
          count: 1
        }
        tempCart = [...tempCart, item];
      }
    }
    else {
      tempItem.count = tempItem.count + num;
      if (tempItem.count === 0) {
        tempCart = tempCart.filter(item => item._id !== tempItem._id);
      }
      else {
        tempItem.total = tempItem.price * tempItem.count;
        tempItem.total = parseFloat(tempItem.total.toFixed(2));
      }
    }
    this.cart = [...tempCart];
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

}
