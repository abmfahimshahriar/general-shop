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
      image: 'https://iili.io/K1HjTJ.jpg',
      thumbImage: 'https://iili.io/K1HjTJ.jpg',
    },
    {
      image: 'https://iili.io/K1HVYF.jpg',
      thumbImage: 'https://iili.io/K1HVYF.jpg',
    },
    {
      image: 'https://iili.io/K1HXpa.png',
      thumbImage: 'https://iili.io/K1HXpa.png',
    },
  ];

  featuredProducts = [];
  productLimit = 3;
  loading = true;
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
        this.loading = false;
      })
      .catch((err) => console.error(err));
  }

  cartManager(cartItem) {
    this.productService.cartManagerService(cartItem, this.featuredProducts);
  }
}
