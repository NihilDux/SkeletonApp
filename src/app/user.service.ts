import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData: any = {};

  saveUserData(userData: any) {
    this.userData = { ...userData };
  }

  getUserData() {
    return { ...this.userData };
  }
}
