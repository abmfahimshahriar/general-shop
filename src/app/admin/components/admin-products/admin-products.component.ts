import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  products: any[];
  Search: FormControl;
  subscription: Subscription;
  displayedColumns: string[] = ['title', 'price', 'company', 'action'];
  constructor(
    private productService: ProductService
  ) {
    this.getProducts();
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProducts() {
    this.subscription = this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data.products;
      console.log(data.products);
    });
  }

  updateProduct(product) {
    console.log(product);
  }

  deleteProduct(product) {
    console.log(product);
  }

  addProduct() {
    
  }

}
