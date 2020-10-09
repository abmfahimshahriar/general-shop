import { baseUrl } from './../../constants/backend.urls';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  baseUrl = baseUrl;
  constructor() {
    
  }

  ngOnInit(): void {
    console.log(this.product);
    this.product.image = this.baseUrl + this.product.image;
  }

}
