import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../componentes/alert/alert.component';
import { Patient } from '../../clases/patient';
import { Professional } from '../../clases/professional';
import { Administrator } from '../../clases/administrator';
import { Subscription } from 'rxjs';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({});
  bootColorAlert: string = "primary";
  mensaje: string = "";
  condicion: boolean = false;
  testing: boolean = false;
  patientTesting: any | undefined;
  patientTesting2: any | undefined;
  patientTesting3: any | undefined;
  professionalTesting: any | undefined;
  professionalTesting2: any | undefined;
  administratorTesting: any | undefined;
  spinner: boolean;
  submitted: boolean;
  user$: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    // private authService: PatientService,
    // private authService: ProfessionalService,
    // private administratorService: AdministratorService
  ) {
    this.createForm();
    this.condicion = false;
    this.testing = false;
    this.spinner = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.loadTesters();
  }

  ngOnDestroy() {
    if (this.user$) {
      this.user$.unsubscribe();
    }

  }
  loadTesters() {
    this.authService.getUsuarioById("fde3a13a-59c1-40a2-8abf-7d92deed0bf5").then(testintgPatient =>
    {
      console.log('testing patient', testintgPatient);
      
      this.patientTesting = testintgPatient;
    })
    this.authService.getUsuarioById("b72a3e4a-ba9c-4b7c-b82a-c6719df4bc7e").then(testintgPatient =>
    {
      this.patientTesting2 = testintgPatient;
    })
    this.authService.getUsuarioById("56b96218-91d4-430a-80a1-00273c0813c5").then(testintgPatient =>
    {
      this.patientTesting3 = testintgPatient;
    })
    this.authService.getUsuarioById("a38285e4-da74-46d1-b37b-79f57a6e8ba0").then(testingProfessional =>
    {
      this.professionalTesting = testingProfessional;
    })
    this.authService.getUsuarioById("f201fa5b-e1a5-4ca4-ba4a-1e7f6ed90707").then(testingProfessional =>
    {
      this.professionalTesting2 = testingProfessional;
    })
    this.authService.getUsuarioById("f201fa5b-e1a5-4ca4-ba4a-1e7f6ed90707").then(testingAdministrator =>
    {
      this.administratorTesting = testingAdministrator;
    })
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onLogin() {
    this.spinner = true;
    console.log('Login', this.loginForm.value);

    this.authService.login(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    ).then((response) => {
      console.log('Login successful', response);
      this.spinner = false;
      this.bootColorAlert = "alert-success"
      this.mensaje = "Verificado✓";
      this.submitted = true;
      setTimeout(() => {
        this.router.navigate(['/Home']);
      }, 2000)

    }).catch((error) => {
      this.spinner = false;
      console.error('Login failed', error);
      this.bootColorAlert = "alert-danger"
      this.mensaje = error.message;
      this.submitted = true;
      console.log('Usuario no registrado', error)
    });
    // this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then(userCredential =>
    // {
    //   if (this.verificarUsuarioTesting(userCredential.user))
    //   {
    //     return true;
    //   }
    //   if (userCredential.user.emailVerified)
    //   {
    //     this.onLoginSuccess(userCredential.user);
    //   }
    //   else
    //   {
    //     this.bootColorAlert = "danger";
    //     this.mensaje = "Verifique su email";
    //     this.spinner = false;
    //     this.submitted = true;
    //   }
    // }).catch(error =>
    // {
    //   this.bootColorAlert = "danger"
    //   this.cargarMensajeErrorAuth(error);
    //   this.submitted = true;
    //   this.spinner = false;
    //   console.log('Error: ', error)
    // })
  }
  onLoginSuccess(user?: User) {
    // this.user$ = this.authService.user$.subscribe(value =>
    // {
    //   if ((value as Professional).usertype == "professional" && !(value as Professional).approved)
    //   {
    //     this.bootColorAlert = "danger"
    //     this.mensaje = "Espere ser aprobado por un Administrador";
    //     this.submitted = true;
    //     this.spinner = false;
    //   } else
    //   {
    //     this.bootColorAlert = "success"
    //     this.mensaje = "Verificado✓";
    //     this.submitted = true;
    //     setTimeout(t =>
    //     {
    //       this.router.navigate(['/home']);
    //     }, 2000)
    //   }
    // })

  }
  verificarUsuarioTesting(user: User) {
    switch (user.email) {
      case "pacientegonzales@gmail.com":
        this.onLoginSuccess();
        return true;
        break;
      case "pacientediego@gmail.com":
        this.onLoginSuccess();
        return true;
        break;
      case "pacientecarlitos@gmail.com":
        this.onLoginSuccess();
        return true;
        break;
      case "medicovalderrama@gmail.com":
        this.onLoginSuccess();
        return true;
        break;
      case "medico2delaolla@gmail.com":
        this.onLoginSuccess();
        return true;
        break;
      case "administratordario@gmail.com":
        this.onLoginSuccess();
        return true;
        break;
      default: return false;
        break;
    }
  }

  cargarMensajeErrorAuth(error: any) {
    switch (error.code) {
      case "auth/user-not-found":
        this.mensaje = "Usuario no registrado";
        break;
      case "auth/wrong-password":
        this.mensaje = "Contraseña incorrecta";
        break;
      case "auth/invalid-email":
        this.mensaje = "email invalido";
        break;
      case "auth/email-already-exists":
        this.mensaje = "El email ya existe";/* (para singin) */
        break;
      default: this.mensaje = "email invalido";
        break;
    }
  }

  enterAsClient() {
    this.loginForm.controls['email'].setValue('pacientegonzales@gmail.com');
    this.loginForm.controls['password'].setValue('111111');
  }
  enterAsClient1() {
    this.loginForm.controls['email'].setValue('pacientediego@gmail.com');
    this.loginForm.controls['password'].setValue('111111');
  }
  enterAsClient2() {
    this.loginForm.controls['email'].setValue('pacientecarlitos@gmail.com');
    this.loginForm.controls['password'].setValue('111111');
  }
  enterAsProfessional() {
    this.loginForm.controls['email'].setValue('medicovalderrama@gmail.com');
    this.loginForm.controls['password'].setValue('111111');
  }
  enterAsProfessional1() {
    this.loginForm.controls['email'].setValue('medico2delaolla@gmail.com');
    this.loginForm.controls['password'].setValue('111111');
  }
  enterAsAdministrator() {
    this.loginForm.controls['email'].setValue('administratordario@gmail.com');
    this.loginForm.controls['password'].setValue('111111');
  }

  navigate(route: any) {
    this.router.navigate(route);
  }


}
