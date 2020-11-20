import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productUrls } from '../../shared/constants/backend.urls';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(
    private http: HttpClient
  ) { }

  getToken() {
    const storageData = JSON.parse(localStorage.getItem('userData'));
    return storageData.userData.token;
  }

  placeOrder(payload) {
    const token = this.getToken();
    return this.http.put(
      productUrls.placeOrder,
      payload,
      {
        headers : {
          Authorization: 'Bearer ' + token
        }
      }
    );
  }
}
