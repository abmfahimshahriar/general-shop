import {
  SET_AUTHENTICATED_ADMIN,
  SET_UNAUTHENTICATED_ADMIN,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from './../../../store/types';
import { SnackBarComponent } from './../../../shared/components/snack-bar/snack-bar.component';
import { AuthenticationService } from './../../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SideNavService } from '../../services/side-nav.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminAuthGuardService } from '../../../admin/services/admin-auth-guard.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../store/store';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  @Output() themeMode = new EventEmitter();
  error = null;
  cart;
  cartTotalItems = 0;
  isLoggedIn = false;
  isAdmin = false;
  subscription: Subscription;
  authenticated: boolean;
  authenticatedAsAdmin: boolean;
  constructor(
    private sideNavService: SideNavService,
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.ngRedux.subscribe(() => {
      this.cart = this.ngRedux.getState().cart;
      this.authenticated = this.ngRedux.getState().authenticated;
      this.authenticatedAsAdmin = this.ngRedux.getState().authenticatedAsAdmin;
      const total = this.cart.map((item) => item.count);
      this.cartTotalItems = total.reduce((a, b) => a + b, 0);
    });
  }

  ngOnInit(): void {
    this.checkAuthenticationValidity();
  }

  clickMenu() {
    this.sideNavService.toggle();
  }
  authentication() {
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AuthModalComponent, {
      autoFocus: false,
    });

    dialogRef.componentInstance.login.subscribe(async (response) => {
      this.authService.signInUser(response.value).subscribe(
        (responseData: any) => {
          console.log(responseData);
          const user = {
            message: responseData.message,
            userData: {
              token: responseData.userData.token,
              userId: responseData.userData.userId,
            },
          };
          localStorage.setItem('userData', JSON.stringify(user));
          this.openSnackBar(responseData);
          this.setLoggedInFlag();
          this.setAdminAuthFlag();
          this.ngRedux.dispatch({ type: SET_AUTHENTICATED });
        },
        (error) => {
          this.error = error.error;
          console.log(this.error);
          this.openSnackBar(this.error);
        }
      );
      dialogRef.close();
    });

    dialogRef.componentInstance.signUp.subscribe(async (response) => {
      console.log(response.value);
      this.authService.signUpUser(response.value).subscribe(
        (responseData) => {
          console.log(responseData);
          this.openSnackBar(responseData);
        },
        (error) => {
          this.error = error.error;
          console.log(this.error);
          this.openSnackBar(this.error);
        }
      );
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
        message: data.message,
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
    this.subscription = this.authService
      .getUser(userData)
      .subscribe((data: any) => {
        if (data.userData.role === 'admin') {
          this.isAdmin = true;
          this.ngRedux.dispatch({ type: SET_AUTHENTICATED_ADMIN });
        } else {
          this.isAdmin = false;
          this.ngRedux.dispatch({ type: SET_UNAUTHENTICATED_ADMIN });
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
    this.subscription = this.authService
      .getUser(userData)
      .subscribe((data: any) => {
        if (data.userData) {
          this.isLoggedIn = true;
          this.ngRedux.dispatch({ type: SET_AUTHENTICATED });
        } else {
          this.isLoggedIn = false;
          this.ngRedux.dispatch({ type: SET_UNAUTHENTICATED });
        }
      });
  }

  logOut() {
    localStorage.removeItem('userData');
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.ngRedux.dispatch({ type: SET_UNAUTHENTICATED });
    this.ngRedux.dispatch({ type: SET_UNAUTHENTICATED_ADMIN });
    this.router.navigate(['']);
  }

  checkAuthenticationValidity() {
    const storageData = JSON.parse(localStorage.getItem('userData'));
    if (storageData) {
      const token = storageData.userData.token;
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        this.logOut();
      } else {
        this.setAdminAuthFlag();
        this.setLoggedInFlag();
      }
    } else {
      this.setAdminAuthFlag();
      this.setLoggedInFlag();
    }
  }
}
