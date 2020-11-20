import { baseUrl } from './../../constants/backend.urls';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../store';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product;
  @Output() addToCart = new EventEmitter<any>();
  cart;
  baseUrl = baseUrl;
  count = 0;
  emptyCart = true;
  reduxSubscription;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
    this.cart = this.ngRedux.getState().cart;
  }

  ngOnInit(): void {
    // this.reduxSubscription = this.ngRedux.subscribe(() => {
    //   const store = this.ngRedux.getState();
    //   this.cart = store.cart;
      
    // });
    this.checkCart();
    this.product.image = this.baseUrl + this.product.image;
  }

  ngOnDestroy() {
    // this.reduxSubscription.unsubscribe();
  }
  checkCart() {
    const cart = this.ngRedux.getState().cart;
    if (cart) {
      const inCartItem = cart.find(item => item._id === this.product._id);
      if (inCartItem) {
        this.count = inCartItem.count;
        this.emptyCart = false;
      }
    }
  }

  onCart(prodId, type) {
    this.emptyCart = false;
    if (type === 'remove') {
      if (this.count === 1) {
        this.count = 0;
        this.emptyCart = true;
      }
      else this.count -= 1;
    }
    else {
      this.count += 1
    }
    const cartItem = {
      prodId: prodId,
      type: type
    }
    this.addToCart.emit(cartItem);
  }

}
