import { ShoppingService } from './../../services/shopping.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAppState } from '../../../store/store';
import { NgRedux } from '@angular-redux/store';
import { UPDATED_CART } from '../../../store/types';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  cart;
  totalCost;
  error = null;
  constructor(
    private fb: FormBuilder,
    private shoppingService: ShoppingService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.initForm();
  }
  ngOnInit(): void {
    this.cart = this.ngRedux.getState().cart;
    this.getTotalCost();
  }

  initForm() {
    this.checkoutForm = this.fb.group({
      cusName: [null, [Validators.required, Validators.maxLength(64)]],
      address: [null, [Validators.required, Validators.maxLength(128)]],
      contact: [null, [Validators.required, Validators.maxLength(16)]]
    });
  }

  async onOrder() {
    const payload = {
      cusName: this.checkoutForm.value.cusName,
      address: this.checkoutForm.value.address,
      contact: this.checkoutForm.value.contact,
      userId: this.getUserId(),
      total: this.totalCost,
      products: [...this.cart]
    }

    await this.shoppingService.placeOrder(payload)
      .subscribe(resultData => {
        this.openSnackBar(resultData);
      }, error => {
        this.error = error.error;
        console.log(this.error);
        this.openSnackBar(this.error);
      });
      this.ngRedux.dispatch({ type: UPDATED_CART, body: [] });
      this.router.navigate(['']);
  }
  getTotalCost() {
    const total = this.cart.map(item => item.total);
    this.totalCost = total.reduce((a, b) => a + b, 0);
  }
  getUserId() {
    const storageData = JSON.parse(localStorage.getItem('userData'));
    return storageData.userData.userId;
  }

  openSnackBar(data) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {
        message: data.message
      },

    });
  }

}
