import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../store/store';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart;
  constructor(
    private ngRedux: NgRedux<IAppState>,
  ) {
    
  }

  ngOnInit(): void {
    this.cart = this.ngRedux.getState().cart;
  }

}
