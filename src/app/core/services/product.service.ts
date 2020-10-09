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
}
