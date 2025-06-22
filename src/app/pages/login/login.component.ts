import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../componentes/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, AlertComponent,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({});
  mensaje: string = "";
  submitted: boolean = false;
  colorAlert: string = "alert-danger";
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { this.createForm() }

  ngOnInit(): void {
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onLogin() {

    console.log('Login', this.loginForm.value);

    this.authService.login(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    ).then((response) => {
      console.log('Login successful', response);

        this.colorAlert = "alert-success"
        this.mensaje = "Verificado✓";
        this.submitted = true;
        setTimeout(() => {
          this.router.navigate(['/Home']);
        }, 2000)
      


    }).catch((error) => {
      console.error('Login failed', error);
      this.colorAlert = "alert-danger"
        this.mensaje = error.message;
        this.submitted = true;
        console.log('Usuario no registrado', error)
    });

    // this.authService.supabase.auth.signInWithPassword({
    //   email: this.loginForm.controls['email'].value,
    //   password: this.loginForm.controls['password'].value
    // }).then((response) => {
    //   if (response.error) {
    //     this.colorAlert = "alert-danger"
    //     this.mensaje = response.error.message;
    //     this.submitted = true;
    //     console.log('Usuario no registrado', response.error)
    //   } else {
    //     this.colorAlert = "alert-success"
    //     this.mensaje = "Verificado✓";
    //     this.submitted = true;
    //     setTimeout(() => {
    //       this.router.navigate(['/home']);
    //     }, 2000)
    //   }
    // }).catch((error: { message: string; }) => {
    //   this.colorAlert = "alert-danger"
    //   this.mensaje = error.message;
    //   this.submitted = true;
    //   console.log('Usuario no registrado', error)
    // })
  }

  entrarComoAdmin() {
    if (this.loginForm) {
      this.loginForm.controls['email'].setValue("admin@admin.com");
      this.loginForm.controls['password'].setValue("111111");
    }
  }

}
