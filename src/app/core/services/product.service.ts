import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {productUrls} from '../../shared/constants/backend.urls'
import { NgRedux } from '@angular-redux/store';
import { UPDATED_CART } from 'src/app/store/actions';
import { IAppState } from 'src/app/store/store';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cart: any[] = [];
  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.cart = this.ngRedux.getState().cart;
  }

  getToken() {
    const storageData = JSON.parse(localStorage.getItem('userData'));
    return storageData.userData.token;
  }

  getAllProducts(payload) {
    return this.http.put(
      productUrls.getAllProducts,
      payload
    );
  }

  getFeaturedProducts(payload) {
    return this.http.put(
      productUrls.getFeaturedProducts,
      payload
    );
  }

  getSingleProduct(prodId) {
    return this.http.get(
      productUrls.getSingleProduct + prodId
    );
  }

  addProduct(payload) {
    const token = this.getToken();
    return this.http.post(
      productUrls.addProduct,
      payload,
      {
        headers : {
          Authorization: 'Bearer ' + token
        }
      }
    );
  }

  updateProduct(payload, prodId) {
    const token = this.getToken();
    return this.http.put(
      productUrls.updateProduct + prodId,
      payload,
      {
        headers : {
          Authorization: 'Bearer ' + token
        }
      }
    );
  }

  deleteProduct(prodId) {
    const token = this.getToken();
    return this.http.delete(
      productUrls.deleteProduct + prodId,
      {
        headers : {
          Authorization: 'Bearer ' + token
        }
      }
    );
  }



  cartManagerService(cartItem,products) {
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
        tempItem = products
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
    this.ngRedux.dispatch({ type: UPDATED_CART, body: this.cart });
  }
}
