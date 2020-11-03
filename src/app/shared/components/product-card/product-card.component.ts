import { baseUrl } from './../../constants/backend.urls';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  @Output() addToCart = new EventEmitter<any>();
  baseUrl = baseUrl;
  count = 0;
  emptyCart = true;
  constructor() {
    
  }

  ngOnInit(): void {
    this.checkCart();
    console.log(this.product);
    this.product.image = this.baseUrl + this.product.image;
  }
  checkCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart.length);
    if(cart){
      const inCartItem = cart.find(item => item._id === this.product._id);
      if(inCartItem) {
        this.count = inCartItem.count;
        this.emptyCart = false;
      }
    }
  }

  onCart(prodId,type) {
    this.emptyCart = false;
    if(type === 'remove') {
      if(this.count === 1){
        this.count = 0;
        this.emptyCart = true;
      }
      else this.count -= 1;
    }
    else{
      this.count += 1
    }
    const cartItem = {
      prodId: prodId,
      type: type
    }
    this.addToCart.emit(cartItem);
  }

}
