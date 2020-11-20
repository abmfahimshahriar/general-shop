import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.initForm();
  }
  
  initForm() {
    this.checkoutForm = this.fb.group({
      cusName: [null,[Validators.required,Validators.maxLength(64)]],
      address: [null,[Validators.required,Validators.maxLength(128)]],
      contact: [null,[Validators.required,Validators.maxLength(16)]]
    });
  }
  ngOnInit(): void {
  }

  onOrder() {
    console.log(this.checkoutForm);
  }

}
