import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  file;
  productDetails;
  prodId;
  buttonLabel = 'Add';
  error = null;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  async ngOnInit() {
    this.productDetails = await this.route.snapshot.data.productDetails
      ?.product;
    this.prodId = await this.route.snapshot.queryParams.prodId;
    if (this.prodId) {
      this.buttonLabel = 'Update';
    }
    this.initForm();
  }

  initForm() {
    this.addProductForm = this.fb.group({
      title: [this.productDetails?.title, Validators.required],
      company: [this.productDetails?.company, Validators.required],
      description: [this.productDetails?.description, Validators.required],
      featured: [this.productDetails?.featured ? this.productDetails?.featured: false, Validators.required],
      freeShipping: [this.productDetails?.freeShipping ? this.productDetails?.freeShipping: false, Validators.required],
      price: [this.productDetails?.price, Validators.required],
      // image: [null, Validators.required],
      firstImage: [this.productDetails?.imageArray[0],Validators.required],
      secondImage: [this.productDetails?.imageArray[1],Validators.required],
      thirdImage: [this.productDetails?.imageArray[2],],
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
    const imageArray = [];
    if (this.addProductForm.value.firstImage)
      imageArray.push(this.addProductForm.value.firstImage);
    if (this.addProductForm.value.secondImage)
      imageArray.push(this.addProductForm.value.secondImage);
    if (this.addProductForm.value.thirdImage)
      imageArray.push(this.addProductForm.value.thirdImage);
    const payload = {
      ...this.addProductForm.value,
      imageArray: imageArray,
    };

    if (!this.prodId) {
      await this.productService.addProduct(payload).subscribe(
        (resultData) => {
          this.openSnackBar(resultData);
        },
        (error) => {
          this.error = error.error;
          console.log(this.error);
          this.openSnackBar(this.error);
        }
      );
    } else {
      await this.productService.updateProduct(payload, this.prodId).subscribe(
        (resultData) => {
          this.openSnackBar(resultData);
        },
        (error) => {
          this.error = error.error;
          console.log(this.error);
          this.openSnackBar(this.error);
        }
      );
    }

    this.router.navigate(['admin', 'products']);
  }

  onCancel() {
    this.router.navigate(['admin', 'products']);
  }

  processFile(event) {
    this.file = event.target.files[0];
  }

  openSnackBar(data) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {
        message: data.message,
      },
    });
  }
}
