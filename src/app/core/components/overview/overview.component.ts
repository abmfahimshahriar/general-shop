import { take } from 'rxjs/operators';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  imageObject = [
    {
      image: 'https://iili.io/Ka7Lu4.jpg',
      thumbImage: 'https://iili.io/Ka7Lu4.jpg',
    },
  ];

  featuredProducts = [];
  productLimit = 3;

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    await this.getFeaturedProducts();
  }

  async getFeaturedProducts() {
    const payload = {
      productLimit: this.productLimit,
    };
    await this.productService
      .getFeaturedProducts(payload)
      .pipe(take(1))
      .toPromise()
      .then((data: any) => {
        this.featuredProducts = data.products;
      })
      .catch((err) => console.error(err));
    console.log(this.featuredProducts);
  }

  cartManager(cartItem) {
    this.productService.cartManagerService(cartItem,this.featuredProducts);
  }
}
