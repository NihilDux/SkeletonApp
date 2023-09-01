import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('loginCardWrapper', { read: ElementRef, static: true }) loginCardWrapper!: ElementRef;

  login: any = {
    Usuario: '',
    Password: '',
  };

  constructor(
    private userService: UserService,
    private router: Router,
    public toastController: ToastController,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {}

  async ingresar() {
    const validationMessage = this.validateModel(this.login);
    if (validationMessage === 'success') {
      const userData = { Usuario: this.login.Usuario };
      this.userService.saveUserData(userData);
      this.presentToast('Bienvenido');
      await this.playLoginAnimation();
      this.router.navigate(['/home']);
    } else {
      this.presentToast('Falta: ' + validationMessage);
    }
  }

  validateModel(model: any): string {
    for (const [key, value] of Object.entries(model)) {
      if (value === '') {
        return key;
      }
    }
    return 'success';
  }

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration ? duration : 2000,
    });
    toast.present();
  }

  async playLoginAnimation() {
    const cardElement = this.loginCardWrapper.nativeElement.querySelector('.login-card');

    const animation = this.animationCtrl
      .create()
      .addElement(cardElement)
      .duration(800)
      .iterations(1)
      .fromTo('transform', 'translateY(0)', 'translateY(-100px)')
      .fromTo('opacity', '1', '0');

    await animation.play();
  }
}
