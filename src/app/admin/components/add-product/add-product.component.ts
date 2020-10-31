import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  file;
  error = null;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.addProductForm = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      description: ['', Validators.required],
      featured: [false, Validators.required],
      freeShipping: [false, Validators.required],
      price: [0, Validators.required],
      image: [null, Validators.required],
    });
  }

  async onSubmit() {
    const formData = new FormData();
    formData.append('title', this.addProductForm.value.title);
    formData.append('company', this.addProductForm.value.company);
    formData.append('description', this.addProductForm.value.description);
    formData.append('featured', this.addProductForm.value.featured);
    formData.append('freeShipping', this.addProductForm.value.freeShipping);
    formData.append('price', this.addProductForm.value.price);
    formData.append('image', this.file);
    console.log(formData);
    await this.productService.addProduct(formData)
      .subscribe(resultData => {
        this.openSnackBar(resultData);
      },error => {
        this.error = error.error;
        console.log(this.error);
        this.openSnackBar(this.error);
      });
      this.router.navigate(['admin','products']);
  }

  processFile(event) {
    this.file = event.target.files[0];
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
