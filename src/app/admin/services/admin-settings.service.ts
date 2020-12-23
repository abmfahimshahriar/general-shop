import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { settingsUrls } from 'src/app/shared/constants/backend.urls';

@Injectable({
  providedIn: 'root'
})
export class AdminSettingsService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getToken() {
    const storageData = JSON.parse(localStorage.getItem('userData'));
    return storageData.userData.token;
  }

  getCoverPhotos() {
    return this.http.get(
      settingsUrls.getCoverPhotos
    );
  }

  addCoverPhotos(payload) {
    const token = this.getToken();
    return this.http.put(
      settingsUrls.addCoverPhotos,
      payload,
      {
        headers : {
          Authorization: 'Bearer ' + token
        }
      }
    );
  }
}
