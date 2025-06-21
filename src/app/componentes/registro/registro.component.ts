import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { FileI } from '../../interface/file';
import { AlertComponent } from "../alert/alert.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,AlertComponent,ReactiveFormsModule ,RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  userForm: FormGroup = new FormGroup({});
  photo1?: FileI;
  photo2?: FileI;
  photos: Array<FileI> = new Array();
  submitted: boolean = false;
  mensaje: string = '';
  colorAlert: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {

    console.log('Registro', this.userForm.value);
    this.authService.register(
      this.userForm.controls['email'].value,
      this.userForm.controls['password'].value
    ).then(user => {
      console.log('Usuario registrado', user);
      this.colorAlert = "alert-success";
      this.mensaje = "Registrado correctamente";
      this.submitted = true;
      setTimeout(() => {
        this.authService.login(
          this.userForm.controls['email'].value,
          this.userForm.controls['password'].value
        ).then(() => {
          this.router.navigate(["/Home"]);
        });
      }, 2000);
    }).catch(error => {
      console.error('Error al registrar usuario', error);
      this.colorAlert = "alert-danger";
      this.mensaje = error.message; // "Hubo un problema al registrarse"
      this.submitted = true;
    });
    // try {
    //   this.authService.register(this.userForm.controls.email.value, this.userForm.controls.password.value).then(user => {
    //     if (user) {
    //       this.userService.createUser(this.userForm.value, this.photos).then(user => {
    //         console.log('Registrado correctamente');
    //         this.colorAlert = "alert-success"
    //         this.mensaje = "Registrado correctamente";
    //         this.submitted = true;
    //         setTimeout(t => {
    //           this.authService.login(this.userForm.controls.email.value, this.userForm.controls.password.value).then(t => {
    //             this.router.navigate(["/home"]);
    //           })
    //         }, 2000)
    //       });
    //     }
    //   }).catch(error => {
    //     console.log('Error', error);
    //     this.colorAlert = "alert-danger"
    //     this.mensaje = error.message;/* "Hubo un problema al registrarse" */
    //     this.submitted = true;
    //   });

    // } catch (error) {
    //   console.log('Error fuera', error);
    // }
  }

  navigate() {
    this.router.navigate(['/Login']);
  }


}
