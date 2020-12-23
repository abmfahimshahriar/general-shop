import { AdminSettingsService } from './../../../admin/services/admin-settings.service';
import { take, map } from 'rxjs/operators';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  imageObject;

  featuredProducts = [];
  productLimit = 3;
  loading = true;
  constructor(
    private productService: ProductService,
    private settingsService: AdminSettingsService
  ) {}

  async ngOnInit() {
    await this.getFeaturedProducts();
    await this.getCoverPhotos();
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

  async getCoverPhotos() {
    this.settingsService
      .getCoverPhotos()
      .pipe(take(1))
      .toPromise()
      .then((res: any) => {
        const tempCoverPhotos = res.coverPhotos;
        const imageArray =
          tempCoverPhotos[tempCoverPhotos.length - 1].imageArray;
        const tempImageObject = imageArray.map((item) => {
          return {
            image: item,
            thumbImage: item,
          };
        });
        this.imageObject = tempImageObject;
      })
      .catch((err) => console.error(err));
  }
}
