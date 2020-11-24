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

  getAllOrders() {
    return this.http.get(
      productUrls.getOrders
    );
  }
}
