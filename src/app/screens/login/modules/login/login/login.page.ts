import { Component, OnInit } from '@angular/core';
import { Login } from '../../../../../models/Login_model';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginData: Login = {
    email: '',
    pass: '',
  };

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}
  async login() {
    if (!this.loginData.email || !this.loginData.pass) {
      this.presentErrorAlert('Ambos campos son obligatorios.');
      return;
    }
    const loader = await this.loadingController.create({
      message: 'Iniciando sesión...', // Mensaje en el loader
      duration: 5000, 
    });
    await loader.present(); // Mostrar el loader

    this.http.post('URL_DE_LA_API_AQUI', this.loginData).subscribe(
      (response) => {
        console.log('Respuesta de la API:', response);
        loader.dismiss(); // Ocultar el loader
      },
      (error) => {
        console.error('Error en la solicitud POST:', error);
        loader.dismiss(); // Ocultar el loader en caso de error

        // Mostrar una alerta en caso de error
        this.presentErrorAlert(
          'Hubo un error durante el inicio de sesión. Por favor, inténtalo de nuevo.'
        );
      }
    );
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  navigateToRegisterPage() {
    this.router.navigate(['/register']);
  }
}
