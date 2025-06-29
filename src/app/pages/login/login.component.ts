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
  patientTesting: Patient | undefined;
  patientTesting2: Patient | undefined;
  patientTesting3: Patient | undefined;
  professionalTesting: Professional | undefined;
  professionalTesting2: Professional | undefined;
  administratorTesting: Administrator | undefined;
  spinner: boolean;
  submitted: boolean;
  user$: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    // private patientService: PatientService,
    // private professionalService: ProfessionalService,
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
    // this.patientService.getPatientById("cEewD51RQsYrvaYHQ3eRAzkUHDJ3").then(testintgPatient =>
    // {
    //   this.patientTesting = testintgPatient;
    // })
    // this.patientService.getPatientById("eJy59XbCO5e4zkUplxg8D2qTmpJ2").then(testintgPatient =>
    // {
    //   this.patientTesting2 = testintgPatient;
    // })
    // this.patientService.getPatientById("EDbEwSOa7LffKBoGvCb1tjYcdvf1").then(testintgPatient =>
    // {
    //   this.patientTesting3 = testintgPatient;
    // })
    // this.professionalService.getProfessionalById("Gl3GGMtAYrWBeX4640f7mLvPTKx1").then(testingProfessional =>
    // {
    //   this.professionalTesting = testingProfessional;
    // })
    // this.professionalService.getProfessionalById("R2imG9PU9RhpfrgMhztOcJP6dSM2").then(testingProfessional =>
    // {
    //   this.professionalTesting2 = testingProfessional;
    // })
    // this.administratorService.getAdministratorById("R3zdRbRiInOlAqSyD4NDakhcBR13").then(testingAdministrator =>
    // {
    //   this.administratorTesting = testingAdministrator;
    // })
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
