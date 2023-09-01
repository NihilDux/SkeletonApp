import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, ToastController, AnimationController } from '@ionic/angular';
import { UserService } from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  /*Se genera referencia del elemento a animar*/
  @ViewChild('titulo', { read: ElementRef }) titulo: ElementRef;
  @ViewChild('nombreInput', { read: ElementRef }) nombreInput: ElementRef;
  @ViewChild('apellidoInput', { read: ElementRef }) apellidoInput: ElementRef;
  @ViewChild('nivelInput', { read: ElementRef }) nivelInput: ElementRef;
  @ViewChild('fechaInput', { read: ElementRef }) fechaInput: ElementRef;

  userData: any = {
    Nombre: '',
    Apellido: '',
    NivelEducacion: '',
    FechaNacimiento: '',
  };

  currentYear: number = new Date().getFullYear();

  filledFields: string[] = [];

  niveles = [
    { id: '1', nivel: 'Básica Incompleta' },
    { id: '2', nivel: 'Básica Completa' },
    { id: '3', nivel: 'Media Incompleta' },
    { id: '4', nivel: 'Media Completa' },
    { id: '5', nivel: 'Superior Incompleta' },
    { id: '6', nivel: 'Superior Completa' },
  ];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private animationCtrl: AnimationController,
    private userService: UserService
    
  ) {
    /*Declaramos las variables titulo y input que almacena la referencia*/
    this.titulo = ElementRef.prototype as any;
    this.nombreInput = ElementRef.prototype as any;
    this.apellidoInput = ElementRef.prototype as any;
    this.nivelInput = ElementRef.prototype as any;
    this.fechaInput = ElementRef.prototype as any;

  }

  /*Utilizamos el metodo ngAfterViewInit que se ejecutara poster a inicializar la vista*/
   async ngAfterViewInit() {
    const titleElement = this.titulo.nativeElement;

    const translateAnimation = this.animationCtrl
      .create()
      .addElement(titleElement)
      .keyframes([
        { offset: 0, transform: 'translateX(0)' },
        { offset: 0.5, transform: 'translateX(50%)' },
        { offset: 1, transform: 'translateX(0)' },
      ])
      .duration(1500);

    const opacityAnimation = this.animationCtrl
      .create()
      .addElement(titleElement)
      .keyframes([
        { offset: 0, opacity: '1' },
        { offset: 0.5, opacity: '0.2' },
        { offset: 1, opacity: '1' },
      ])
      .duration(1000);

    const combinedAnimation = this.animationCtrl
      .create()
      .addAnimation([translateAnimation, opacityAnimation]);

    const repeatAnimation = async () => {
      await combinedAnimation.play();
      setTimeout(repeatAnimation, 2500);
    };

    repeatAnimation();
  }
  async limpiarCampos() {
    const inputElements = [
      this.nombreInput.nativeElement,
      this.apellidoInput.nativeElement,
      this.nivelInput.nativeElement,
      this.fechaInput.nativeElement,
    ];

    for (let i = 0; i < this.filledFields.length; i++) {
      const field = this.filledFields[i];
      const inputElement = inputElements[i];

      if (inputElement) {
        const animation = this.animationCtrl
          .create()
          .addElement(inputElement)
          .duration(800)
          .keyframes([
            { offset: 0, transform: 'translateX(0)' },
            { offset: 0.5, transform: 'translateY(50%)' },
          ])
          .duration(750);

        await animation.play();
      }

      this.userData[field] = '';
    }
  }

  isLoggedIn() {
    const userData = this.userService.getUserData();
    return userData && userData.Usuario !== '';
  }

  get loggedInUserName() {
    const userData = this.userService.getUserData();
    return userData.Usuario;
  }

  validateDate() {
    const selectedDate = new Date(this.userData.FechaNacimiento);
    const minDate = new Date(1900, 0, 1);
    const maxDate = new Date();

    if (selectedDate < minDate || selectedDate > maxDate) {
      this.fechaErrorToast();
    }
  }

  async fechaErrorToast() {
    const toast = await this.toastController.create({
      message: 'La fecha está erroea.',
      duration: 3000,
      color: 'danger',
      position: 'bottom',
    });

    await toast.present();
  }

  async mostrarDatos() {
    if (!this.userData.Nombre || !this.userData.Apellido || !this.userData.NivelEducacion || !this.userData.FechaNacimiento) {
      this.mostrarErrorToast();
      return;
    }

    const selectedDate = new Date(this.userData.FechaNacimiento);
    const minDate = new Date(1900, 0, 1);
    const maxDate = new Date();
    
    if (selectedDate < minDate || selectedDate > maxDate) {
      this.fechaErrorToast();
      return;
    }

    const mensaje = `Su nombre es ${this.userData.Nombre} ${this.userData.Apellido}`;
    const alert = await this.alertController.create({
      header: 'Información del Usuario',
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async mostrarErrorToast() {
    const toast = await this.toastController.create({
      message: 'Por favor, complete todos los campos antes de continuar.',
      duration: 3000,
      color: 'danger',
      position: 'bottom',
    });

    await toast.present();
  }

  markFieldAsFilled(fieldName: string) {
    if (!this.filledFields.includes(fieldName)) {
      this.filledFields.push(fieldName);
    }
  }

}
