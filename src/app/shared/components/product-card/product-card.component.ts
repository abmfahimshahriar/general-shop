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
  emptyCart;
  constructor() {
    
  }

  ngOnInit(): void {
    const cart = localStorage.getItem('cart');
    if(cart.length === 0) this.emptyCart = true;
    else this.emptyCart = false;
    console.log(this.product);
    this.product.image = this.baseUrl + this.product.image;
  }

  onCart(prodId,type) {
    if(type === 'remove') {
      if(this.count === 0) this.count = 0;
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
