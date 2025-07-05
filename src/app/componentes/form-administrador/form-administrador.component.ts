import { Component } from '@angular/core';
import { FileI } from '../../interface/file';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { UserType } from '../../enumerados/userType';
import { AlertComponent } from "../alert/alert.component";
import { CommonModule } from '@angular/common';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-form-administrador',
  imports: [AlertComponent, CommonModule, ReactiveFormsModule,RecaptchaModule,RecaptchaFormsModule],
  templateUrl: './form-administrador.component.html',
  styleUrl: './form-administrador.component.css'
})
export class FormAdministradorComponent {

  administratorForm: FormGroup = new FormGroup({});
  registered: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    // private administratorService:AdministratorService,
    private router: Router,
  ) {
    this.registered = false;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.administratorForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      age: ["", [Validators.required, Validators.min(18), Validators.max(99)]],
      dni: ["", [Validators.required, Validators.minLength(7)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      photo1: ["", Validators.required],
      usertype: [UserType.ADMINISTRATOR],
      recaptchaReactive: ["", Validators.required],
    });
  }

  async onSubmit() {
    try {
      var pathPhoto1 = '';
      await this.authService.subirImagenUsuario(this.administratorForm.controls['photo1'].value, `${this.administratorForm.controls['dni'].value}/photo1`).then((response) => {
        if (response) {
          console.log('Foto 1 subida correctamente:', response);
          this.authService.getImagenDeUsuario(response).then((res) => {
            pathPhoto1 = res;
          });
        }
      });

      this.authService.register(this.administratorForm.controls['email'].value, this.administratorForm.controls['password'].value).then(user => {
        if (user) {
          console.log('Usuario registrado correctamente:', user);
          this.authService.registrarDatosusuario({
            nombre: this.administratorForm.controls['name'].value,
            apellido: this.administratorForm.controls['lastName'].value,
            edad: this.administratorForm.controls['age'].value,
            dni: this.administratorForm.controls['dni'].value,
            role: this.administratorForm.controls['usertype'].value,
            Foto1: pathPhoto1,
            id: user.user?.id,
          });
          this.registered = true;
        }
      });

    } catch (error) {
      console.error(error);
    }
  }

  handlePhoto1(file: any) {
    this.administratorForm.controls['photo1'].setValue(file.target.files[0]);
  }



  resolved(captchaResponse: any) {
    /* console.log(`Resolved response token: ${captchaResponse}`); */
  }
  navigate() {
    this.router.navigate(['/login']);
  }


}
