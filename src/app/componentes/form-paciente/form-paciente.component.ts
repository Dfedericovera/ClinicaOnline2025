import { Component } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileI } from '../../interface/file';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { UserType } from '../../enumerados/userType';

@Component({
  selector: 'app-form-paciente',
  imports: [AlertComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './form-paciente.component.html',
  styleUrl: './form-paciente.component.css'
})
export class FormPacienteComponent {

  patientForm: FormGroup = new FormGroup({});
  // photo1: File | null = null;
  // photo2: File | null = null;
  photos: Array<File> = new Array();
  registered: boolean = false;

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
    this.patientForm = this.fb.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      age: ["", [Validators.required, Validators.min(1), Validators.max(110)]],
      dni: ["", Validators.required],
      obraSocial: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      usertype: [UserType.PATIENT],
      photo1: ["", Validators.required],
      photo2: ["", Validators.required],
      id: [""],
      // recaptchaReactive: ["", Validators.required],
    });
  }

  async onSubmit() {
    try {
      /* console.log(this.patientForm.value); */
      var pathPhoto1 = '';
      var pathPhoto2 = '';
      await this.authService.subirImagenUsuario(this.patientForm.controls['photo1'].value, `${this.patientForm.controls['dni'].value}/photo1`).then((response) => {
        if (response) {
          console.log('Foto 1 subida correctamente:', response);
          this.authService.getImagenDeUsuario(response).then((res) => {
            pathPhoto1 = res;
          });
        }
      });
      await this.authService.subirImagenUsuario(this.patientForm.controls['photo2'].value, `${this.patientForm.controls['dni'].value}/photo2`).then((response) => {
        if (response) {
          console.log('Foto 2 subida correctamente:', response);
          this.authService.getImagenDeUsuario(response).then((res) => {
            pathPhoto2 = res;
          });
        }
      });

      this.authService.register(this.patientForm.controls['email'].value, this.patientForm.controls['password'].value).then(user => {
        if (user) {
          console.log('Usuario registrado correctamente:', user);
          this.authService.registrarDatosusuario({
            nombre: this.patientForm.controls['name'].value,
            apellido: this.patientForm.controls['lastName'].value,
            edad: this.patientForm.controls['age'].value,
            dni: this.patientForm.controls['dni'].value,
            obraSocial: this.patientForm.controls['obraSocial'].value,
            role: this.patientForm.controls['usertype'].value,
            Foto1: pathPhoto1,
            Foto2: pathPhoto2,
            id: user.user?.id,
          });
        }
      });

    } catch (error) {
      console.error(error);
    }
  }

  handlePhoto1(file: any) {
    this.patientForm.controls['photo1'].setValue(file.target.files[0]);
  }

  handlePhoto2(file: any) {
    this.patientForm.controls['photo2'].setValue(file.target.files[0]);
  }

  navigate() {
    this.router.navigate(['/login']);
  }

  resolved(captchaResponse: any) {
    /* console.log(`Resolved response token: ${captchaResponse}`); */
  }

}
