import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {productUrls} from '../../shared/constants/backend.urls'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

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
}
