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
  pageNumber = 0;
  pageLimit = 5;

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    await this.getFeaturedProducts();
  }

  async getFeaturedProducts() {
    const payload = {
      // pageNumber: this.pageNumber,
      productLimit: this.pageLimit,
      // searchKey: null,
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
}
