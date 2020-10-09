import { AuthenticationService } from './../../core/services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  
  constructor(
    private authService : AuthenticationService
  ) { }

  canActivate(): Observable<boolean> {
    const storageData = JSON.parse(localStorage.getItem('userData'));
    if(!storageData) {
      console.log('not logged in');
      return;
    }
    const userData = storageData.userData;
    return this.authService.getUser(userData).pipe(
      map(userData => {
        console.log(userData);
        if(userData){
          return true;
        }
        else{
          return false;
        }
      })
    );
    
  }
}
