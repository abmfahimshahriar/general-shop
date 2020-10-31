import { SnackBarComponent } from './../../../shared/components/snack-bar/snack-bar.component';
import { AuthenticationService } from './../../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SideNavService } from '../../services/side-nav.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminAuthGuardService } from '../../../admin/services/admin-auth-guard.service';
import { map } from 'rxjs/internal/operators/map';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  @Output() themeMode = new EventEmitter();
  error = null;
  isLoggedIn = false;
  isAdmin = false;
  subscription: Subscription;
  constructor(
    private sideNavService: SideNavService,
    private authService: AuthenticationService,
    private router: Router,
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
          console.log(responseData);
          localStorage.setItem('userData', JSON.stringify(responseData));
          this.openSnackBar(responseData);
          this.setLoggedInFlag();
          this.setAdminAuthFlag();
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
      duration: 3000,
      data: {
        message: data.message
      },

    });
  }

  setAdminAuthFlag() {
    const storageData = JSON.parse(localStorage.getItem('userData'));
    if (!storageData) {
      console.log('not logged in');
      return;
    }
    const userData = storageData.userData;
    this.subscription = this.authService.getUser(userData).subscribe((data:any) => {
      if (data.userData.role === 'admin') {
        this.isAdmin = true;
      }
      else {
        this.isAdmin = false;
      }
    });
  }

  setLoggedInFlag() {
    const storageData = JSON.parse(localStorage.getItem('userData'));
    if (!storageData) {
      console.log('not logged in');
      return;
    }
    const userData = storageData.userData;
    this.subscription = this.authService.getUser(userData).subscribe((data:any) => {
      if (data.userData) {
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

  logOut() {
    localStorage.removeItem('userData');
    this.router.navigate(['']);
  }

  goToManageProduct() {
    this.router.navigate(['admin','products']);
  }


  ngOnInit(): void {
  }

}
