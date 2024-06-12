import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.email === 'TranslatorText@gmail.com' && this.password === '12345') {
      this.router.navigate(['/dashboard']);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToRecovery() {
    this.router.navigate(['/recovery']);
  }
}
