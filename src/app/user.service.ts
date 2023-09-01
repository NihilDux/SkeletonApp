import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData: any = {};
  private loggedIn: boolean = false; // Agregamos una variable para rastrear el estado de inicio de sesión

  saveUserData(userData: any) {
    this.userData = { ...userData };
    this.loggedIn = true; // Establecemos el estado de inicio de sesión como verdadero
  }

  getUserData() {
    return { ...this.userData };
  }

  isLoggedIn() {
    return this.loggedIn; // Devolvemos el estado de inicio de sesión
  }

  logout() {
    this.userData = {}; // Borramos los datos del usuario
    this.loggedIn = false; // Establecemos el estado de inicio de sesión como falso
  }
}
