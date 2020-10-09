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
  subscription: Subscription;
  constructor(
    private productService: ProductService
  ) { 
    this.subscription = this.productService.getAllProducts().subscribe((data:any) => {
      this.products = data.products;
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
