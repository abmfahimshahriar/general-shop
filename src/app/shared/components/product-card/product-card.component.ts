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
  constructor() {
    
  }

  ngOnInit(): void {
    console.log(this.product);
    this.product.image = this.baseUrl + this.product.image;
  }

  onCart(prodId,type) {
    console.log(prodId,type);
    const cartItem = {
      prodId: prodId,
      type: type
    }
    this.addToCart.emit(cartItem);
  }

}
