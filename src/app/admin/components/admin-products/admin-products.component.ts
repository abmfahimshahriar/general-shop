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
  pageLimit = 5;
  pageNumber = 0;
  searchKey;
  loading = true;
  noItem = false;
  paginatorProperties = {
    length: 100,
    pageSize: 5,
    pageSizeOptions: [5, 10, 25, 100],
  }
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

  async getProducts() {
    const payload = {
      pageNumber: this.pageNumber,
      pageLimit: this.pageLimit,
      searchKey: this.searchKey ? this.searchKey : null
    }
    this.subscription = this.productService.getAllProducts(payload).subscribe((data: any) => {
      this.products = data.products;
      this.paginatorProperties.length = data.totalItems;
      this.loading = false;
      this.noItem = data.totalItems > 0 ? false : true;
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


  pageEvent(event) {
    this.pageNumber = event.pageIndex;
    this.pageLimit = event.pageSize;
    this.paginatorProperties.pageSize = event.pageSize;
    this.loading = true;
    this.getProducts();
  }

  filter(searchKey) {
    this.searchKey = searchKey;
    this.loading = true;
    this.getProducts();
  }

}
