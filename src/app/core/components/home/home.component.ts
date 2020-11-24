import { UPDATED_CART } from './../../../actions';
import { IAppState } from './../../../store';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {NgRedux, select} from '@angular-redux/store'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: any[];
  cart: any[] = [];
  subscription: Subscription;
  reduxSubscription:Subscription;
  pageLimit = 5;
  pageNumber = 0;

  paginatorProperties = {
    length: 100,
    pageSize: 5,
    pageSizeOptions: [5, 10, 25, 100],
  }

  constructor(
    private productService: ProductService,
    private ngRedux: NgRedux<IAppState>,
  ) {
    this.cart = this.ngRedux.getState().cart;
  }

  async ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    const payload = {
      pageNumber: this.pageNumber,
      pageLimit: this.pageLimit
    }
    this.subscription = this.productService.getAllProducts(payload).subscribe((data: any) => {
      this.products = data.products;
      this.paginatorProperties.length = data.totalItems;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cartManager(cartItem) {
    this.cart = this.ngRedux.getState().cart;
    let num = 1;
    if (cartItem.type === 'remove') {
      num = -1;
    }
    let tempCart = [...this.cart];
    let tempItem: any = tempCart
      .find(item => item._id === cartItem.prodId);

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
    // localStorage.setItem('cart', JSON.stringify(this.cart));

    // redux code
    this.ngRedux.dispatch({type: UPDATED_CART,body:this.cart});
  }

  pageEvent(event) {
    this.pageNumber = event.pageIndex;
    this.pageLimit = event.pageSize;
    this.getProducts();
  }

}
