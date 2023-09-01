import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      // El usuario ha iniciado sesión, permitir el acceso a la ruta
      return true;
    } else {
      // El usuario no ha iniciado sesión, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
