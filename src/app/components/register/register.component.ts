import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  register() {
    // Aquí deberías agregar la lógica para registrar al usuario.
    // Este es un ejemplo simple que redirige directamente al dashboard.
    if (this.name && this.email && this.password) {
      // Lógica de registro aquí
      this.router.navigate(['/dashboard']);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}