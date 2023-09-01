import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginDataService {
  private userData: any = {};

  constructor() {}

  saveUserData(userData: any) {
    this.userData = { ...userData };
  }

  getUserData() {
    return { ...this.userData };
  }
}
