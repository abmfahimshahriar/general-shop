import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  file;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {
    this.initForm();
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

  onSubmit() {
    const payload = {
      title: this.addProductForm.value.title,
      company: this.addProductForm.value.company,
      description: this.addProductForm.value.description,
      featured: this.addProductForm.value.featured,
      freeShipping: this.addProductForm.value.freeShipping,
      price: this.addProductForm.value.price,
      image: this.file,
    }
    //console.log(payload);

    const formData = new FormData();
    formData.append('title', this.addProductForm.value.title);
    formData.append('company', this.addProductForm.value.company);
    formData.append('description', this.addProductForm.value.description);
    formData.append('featured', this.addProductForm.value.featured);
    formData.append('freeShipping', this.addProductForm.value.freeShipping);
    formData.append('price', this.addProductForm.value.price);
    formData.append('image', this.file);
    console.log(formData);
    this.productService.addProduct(formData)
      .subscribe(result => {
        console.log(result);
      })
  }

  processFile(event) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  ngOnInit(): void {
  }

}
