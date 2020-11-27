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

  getAllOrders(payload) {
    const token = this.getToken();

    return this.http.put(
      productUrls.getOrders,
      payload,
      {
        headers : {
          Authorization: 'Bearer ' + token
        }
      }
    );
  }

  changeOrderStatus(orderId) {
    const token = this.getToken();
    return this.http.put(
      productUrls.changeOrderStatus + orderId,
      {},
      {
        headers : {
          Authorization: 'Bearer ' + token
        }
      }
    );
  }

  deleteOrder(orderId) {
    const token = this.getToken();
    return this.http.delete(
      productUrls.deleteOrder + orderId,
      {
        headers : {
          Authorization: 'Bearer ' + token
        }
      }
    );
  }

  getMyOrders(userId) {
    const token = this.getToken();
    return this.http.get(
      productUrls.myOrders + userId,
      {
        headers : {
          Authorization: 'Bearer ' + token
        }
      }
    );
  }
}
