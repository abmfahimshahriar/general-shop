import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

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
      map((data: any) => {
        if(data.userData){
          return true;
        }
        else{
          return false;
        }
      })
    );
    
  }
}
