import { CommonModule } from '@angular/common';
import { Component, DoCheck, Inject, OnChanges, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'Clinica Online';
  usuario: any;
  email: string | undefined;


  constructor(public router: Router, public authService: AuthService) {

  }
  ngOnInit(): void {
    this.authService.getUser().then((user: any) => {
      console.log('Usuario obtenido despues de getUser:', user);
      console.log(this.authService.usuario);
      this.usuario = this.authService.usuario
      this.setEmail(user);
    });
  }

  isLoginPage() {
    this.usuario = this.authService.usuario;
    return this.router.url === '/login' || this.router.url === '/registro' || this.router.url === '/bienvenido';
  }

  setEmail(email: string) {
    this.email = email;
    console.log('Email set:', this.email);

  }

  logOut() {
    console.log('Logging out...');
    this.authService.logout().then(() => {
      console.log('Logged out successfully');
      this.router.navigate(['/Login']);
    });
  }
}
