import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {authUrls} from '../../shared/constants/backend.urls'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  signUpUser(userData) {
    return this.http.put(
      authUrls.signUp,
      userData
    );
  }

  signInUser(userData) {
    return this.http.post(
      authUrls.signIn,
      userData
    );
  }

  getUser(userData) {
    return this.http.post(
      authUrls.getUser,
      userData
    )
  }
}
