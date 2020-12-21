import { UPDATED_CART } from '../../../store/actions';
import { IAppState } from '../../../store/store';
import { ProductService } from './../../services/product.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: any[];
  cart: any[] = [];
  subscription: Subscription;
  searchKeySubscription;
  reduxSubscription: Subscription;
  pageLimit = 5;
  pageNumber = 0;
  searchKey;
  baseImage;
  loading = true;
  noItem = false;
  @ViewChild('query') query: ElementRef;
  paginatorProperties = {
    length: 100,
    pageSize: 5,
    pageSizeOptions: [5, 10, 25, 100],
  };

  constructor(
    private productService: ProductService,
    private ngRedux: NgRedux<IAppState>,
    private sanitizer: DomSanitizer
  ) {
    this.cart = this.ngRedux.getState().cart;
  }

  async ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    const payload = {
      pageNumber: this.pageNumber,
      pageLimit: this.pageLimit,
      searchKey: this.searchKey ? this.searchKey : null,
    };
    this.subscription = this.productService
      .getAllProducts(payload)
      .subscribe((data: any) => {
        this.products = data.products;
        this.paginatorProperties.length = data.totalItems;
        // this.baseImage = data.cloudImage.data.data;
        // let objectURL = 'data:image/jpeg;base64,' + data.cloudImage.data.data;
        // this.baseImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.loading = false;
        this.noItem = data.totalItems > 0 ? false : true;
      });
  }
  // _arrayBufferToBase64( buffer ) {
  //   var binary = '';
  //   var bytes = new Uint8Array( buffer );
  //   var len = bytes.byteLength;
  //   for (var i = 0; i < len; i++) {
  //      binary += String.fromCharCode( bytes[ i ] );
  //   }
  //   return window.btoa( binary );
  // }
  // sanitize( url:string ) {
  //   return this.sanitizer.bypassSecurityTrustUrl(url);
  // }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  cartManager(cartItem) {
    this.productService.cartManagerService(cartItem, this.products);
  }

  pageEvent(event) {
    this.pageNumber = event.pageIndex;
    this.pageLimit = event.pageSize;
    this.paginatorProperties.pageSize = event.pageSize;
    this.loading = true;
    this.getProducts();
  }

  filter(searchKey) {
    // this.searchKeySubscription = fromEvent(this.query.nativeElement, 'keyup');
    // this.searchKeySubscription.pipe(debounceTime(1000)).subscribe(c => {
    //   console.log(searchKey);
    //   this.searchKey = searchKey;
    //   this.getProducts();
    // })
    this.searchKey = searchKey;
    this.loading = true;
    this.getProducts();
  }
}
