import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';

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
    private productService: ProductService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {

  }

  ngOnInit(): void {
    this.getProducts();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProducts() {
    this.subscription = this.productService.getAllProducts({}).subscribe((data: any) => {
      this.products = data.products;
    });
  }

  updateProduct(product) {
    const prodId = product._id;
    this.router.navigate(
      ['admin', 'updateproduct'],
      {
        queryParams: {
          prodId: prodId
        }
      }
    );
  }

  deleteProduct(product) {
    const prodId = product._id;
    this.subscription = this.productService.deleteProduct(prodId)
      .subscribe((data: any) => {
        this.openSnackBar(data);
        this.getProducts();
      });
    
  }

  addProduct() {
    this.router.navigate(['admin', 'addproduct']);
  }

  openSnackBar(data) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {
        message: data.message
      },

    });
  }

}
