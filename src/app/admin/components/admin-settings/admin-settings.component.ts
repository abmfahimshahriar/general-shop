import { CoverPhotoModalComponent } from './../cover-photo-modal/cover-photo-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  changeCoverPhoto() {
    const dialogRef = this.dialog.open(CoverPhotoModalComponent, {
      autoFocus: false,
      data: 'hello world'
    });
  }
}
