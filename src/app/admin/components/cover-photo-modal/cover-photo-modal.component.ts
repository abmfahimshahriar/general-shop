import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cover-photo-modal',
  templateUrl: './cover-photo-modal.component.html',
  styleUrls: ['./cover-photo-modal.component.scss'],
})
export class CoverPhotoModalComponent implements OnInit {
  coverPhotosForm: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CoverPhotoModalComponent>
  ) {
    this.initForm();
  }

  ngOnInit() {
    console.log(this.data);
  }

  initForm() {
    this.coverPhotosForm = this.fb.group({
      firstImage: ['', Validators.required],
      secondImage: ['', Validators.required],
      thirdImage: ['', Validators.required],
    });
  }
  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    
  }
}
