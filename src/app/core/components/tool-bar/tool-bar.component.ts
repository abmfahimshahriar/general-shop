import { SnackBarComponent } from './../../../shared/components/snack-bar/snack-bar.component';
import { AuthenticationService } from './../../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SideNavService } from '../../services/side-nav.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  @Output() themeMode = new EventEmitter();
  error = null;

  constructor(
    private sideNavService: SideNavService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

  }

  clickMenu() {
    this.sideNavService.toggle();
  }
  authentication() {
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AuthModalComponent, {
      autoFocus: false
    });

    dialogRef.componentInstance.login.subscribe(async (response) => {
      console.log(response.value);
      this.authService.signInUser(response.value)
      .subscribe(responseData => {
        console.log(responseData );
        this.openSnackBar(responseData);
      }, error => {
        this.error = error.error;
        console.log(this.error);
        this.openSnackBar(this.error);
      });
      dialogRef.close();
    });

    dialogRef.componentInstance.signUp.subscribe(async (response) => {
      console.log(response.value);
      this.authService.signUpUser(response.value)
      .subscribe(responseData => {
        console.log(responseData);
        this.openSnackBar(responseData);
      }, error => {
        this.error = error.error;
        console.log(this.error);
        this.openSnackBar(this.error);
      });
      dialogRef.close();
    });


  }
  changeTheme($event) {
    this.themeMode.emit($event);
  }

  openSnackBar(data) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration:  3000,
      data: {
        message: data.message
      },
      
    });
  }

  ngOnInit(): void {
  }

}
