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
export class AppComponent {

  title = 'SalaDeJuegosVera';
  email: any;


  constructor(public router: Router, public authService: AuthService) {

   }


  isLoginPage() {
    this.email = this.authService.usuario;
    // this.getUserEmail();
    // console.log('Current URL:', this.router.url);
    // Check if the current URL is '/login' or '/Registro'
    return this.router.url === '/Login' || this.router.url === '/Registro';
  }


  logOut() {
    console.log('Logging out...');
    this.authService.logout().then(() => {
      console.log('Logged out successfully');
      this.router.navigate(['/Login']);
    });
  }
}
