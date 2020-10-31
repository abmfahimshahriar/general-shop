import { ProductService } from './../../core/services/product.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';

@Injectable({ providedIn: 'root' })
export class SingleProductDetailsResolver implements Resolve<any> {
    constructor(private productService: ProductService) { }

    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<any> {
        const prodId = route.queryParams.prodId;
        const result = this.productService.getSingleProduct(prodId)
            .pipe(take(1)).toPromise();
        return result;
    }
}