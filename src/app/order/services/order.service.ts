import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productUrls } from '../../shared/constants/backend.urls';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  getToken() {
    const storageData = JSON.parse(localStorage.getItem('userData'));
    return storageData.userData.token;
  }

  getAllOrders() {
    const token = this.getToken();

    return this.http.get(
      productUrls.getOrders,
      {
        headers : {
          Authorization: 'Bearer ' + token
        }
      }
    );
  }
}
