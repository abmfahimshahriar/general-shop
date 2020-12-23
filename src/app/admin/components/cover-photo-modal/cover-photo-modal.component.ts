import { take } from 'rxjs/operators';
import { AdminSettingsService } from './../../services/admin-settings.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-cover-photo-modal',
  templateUrl: './cover-photo-modal.component.html',
  styleUrls: ['./cover-photo-modal.component.scss'],
})
export class CoverPhotoModalComponent implements OnInit {
  coverPhotosForm: FormGroup;
  coverPhotos;
  error = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CoverPhotoModalComponent>,
    private settingsService: AdminSettingsService,
    private _snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.getCoverPhotos();
  }

  initForm() {
    this.coverPhotosForm = this.fb.group({
      firstImage: [this.coverPhotos?.imageArray[0], Validators.required],
      secondImage: [this.coverPhotos?.imageArray[1], Validators.required],
      thirdImage: [this.coverPhotos?.imageArray[2], Validators.required],
    });
  }
  onCancel() {
    this.dialogRef.close();
  }

  getCoverPhotos() {
    this.settingsService
      .getCoverPhotos()
      .pipe(take(1))
      .toPromise()
      .then((res: any) => {
        const tempCoverPhotos = res.coverPhotos;
        this.coverPhotos = tempCoverPhotos[tempCoverPhotos.length - 1];
        this.initForm();
      })
      .catch((err) => console.error(err));
  }
  async onSubmit() {
    const imageArray = [];
    if (this.coverPhotosForm.value.firstImage)
      imageArray.push(this.coverPhotosForm.value.firstImage);
    if (this.coverPhotosForm.value.secondImage)
      imageArray.push(this.coverPhotosForm.value.secondImage);
    if (this.coverPhotosForm.value.thirdImage)
      imageArray.push(this.coverPhotosForm.value.thirdImage);
    const payload = {
      imageArray: imageArray,
    };

    await this.settingsService.addCoverPhotos(payload).subscribe(
      (resultData) => {
        this.openSnackBar(resultData);
        this.dialogRef.close();
      },
      (error) => {
        this.error = error.error;
        console.log(this.error);
        this.openSnackBar(this.error);
      }
    );
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
