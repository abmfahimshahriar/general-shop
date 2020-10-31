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

  getAllProducts() {
    return this.http.get(
      productUrls.getAllProducts
    );
  }

  addProduct(payload) {
    const storageData = JSON.parse(localStorage.getItem('userData'));
    const token = storageData.userData.token;
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
}
