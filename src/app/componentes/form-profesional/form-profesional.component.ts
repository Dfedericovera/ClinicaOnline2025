import { Component } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserType } from '../../enumerados/userType';
import { FileI } from '../../interface/file';
import { AuthService } from '../../services/auth-service.service';
import { Especialidad } from '../../clases/especialidad';
import { SpecialtyListComponent } from "../specialty-list/specialty-list.component";
import { SpecialtyFormComponent } from '../specialty-form/specialty-form.component';
import { EspecialidadService } from '../../services/especialidad.service';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-form-profesional',
  imports: [AlertComponent, CommonModule, ReactiveFormsModule, SpecialtyListComponent, SpecialtyFormComponent,RecaptchaModule,RecaptchaFormsModule],
  templateUrl: './form-profesional.component.html',
  styleUrl: './form-profesional.component.css'
})
export class FormProfesionalComponent {

  professionalForm: FormGroup = new FormGroup({});
  photos: Array<FileI> = [];
  registered: boolean = false;
  specialtys: Especialidad[] = [];
  specialtysChoosen: Especialidad[] = [];
  showSpecialtyForm: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private especialidadService: EspecialidadService
  ) {
    this.showSpecialtyForm = false;
    this.registered = false;
    this.photos = new Array();
  }

  ngOnInit(): void {
    this.createForm();
    this.especialidadService.getEspecialidades().then((posts: any) => {
      console.log(posts);

      this.specialtys = posts;
    });

  }

  createForm() {
    this.professionalForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      dni: ["", [Validators.required, Validators.minLength(7)]],
      age: ["", [Validators.required, Validators.min(18), Validators.max(99)]],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      specialty: [Array, Validators.required],
      approved: [""],
      usertype: [UserType.PROFESSIONAL],
      recaptchaReactive: ["", Validators.required],
      photo1: ["", Validators.required],
    });
  }

  verError() {
    console.log(this.professionalForm);

  }

  async onSubmit() {
    try {
      var pathPhoto1 = '';
      await this.authService.subirImagenUsuario(this.professionalForm.controls['photo1'].value, `${this.professionalForm.controls['dni'].value}/photo1`).then((response) => {
        if (response) {
          console.log('Foto 1 subida correctamente:', response);
          this.authService.getImagenDeUsuario(response).then((res) => {
            pathPhoto1 = res;
          });
        }
      });

      this.authService.register(this.professionalForm.controls['email'].value, this.professionalForm.controls['password'].value).then(user => {
        if (user) {
          console.log('Usuario registrado correctamente:', user);
          this.authService.registrarDatosusuario({
            nombre: this.professionalForm.controls['name'].value,
            apellido: this.professionalForm.controls['lastName'].value,
            edad: this.professionalForm.controls['age'].value,
            dni: this.professionalForm.controls['dni'].value,
            role: this.professionalForm.controls['usertype'].value,
            Foto1: pathPhoto1,
            id: user.user?.id,
          });
          this.specialtysChoosen.forEach(async especialidad => {
            console.log('Especialidad seleccionada:', especialidad);
            await this.authService.registrarEspecialidadesUsuario({
              IdUsuario: user.user?.id,
              IdEspecialidad: especialidad.id
            });
          });

          this.registered = true;
        }
      });

    } catch (error) {
      console.error(error);
    }
  }

  handlePhoto1(file: any) {
    this.professionalForm.controls['photo1'].setValue(file.target.files[0]);
  }

  handlePhoto2(file: any) {
    this.professionalForm.controls['photo2'].setValue(file.target.files[0]);
  }

  navigate() {
    this.router.navigate(['/login']);
  }

  onChooseSpecialty(specialty: Especialidad) {
    if (!this.specialtysChoosen) {
      this.specialtysChoosen = [];
      this.specialtysChoosen.push(specialty);
      this.professionalForm.controls['specialty'].setValue(this.specialtysChoosen);
      console.log(specialty);
    }
    else {
      let isAlreadyChoosen = false;
      this.specialtysChoosen.forEach(specialtyChoosen => {
        if (specialty.Especialidad == specialtyChoosen.Especialidad) {
          isAlreadyChoosen = true;
        }
      })
      if (!isAlreadyChoosen) {
        this.specialtysChoosen.push(specialty);
        this.professionalForm.controls['specialty'].setValue(this.specialtysChoosen);
        console.log(specialty);
      }
    }
    this.especialidadService.getEspecialidades().then((posts: any) => {
      this.specialtys = posts;
    });


  }

  deleteSpecialty(index: any) {
    this.specialtysChoosen.splice(index, 1);
  }
  resolved(captchaResponse: any) {
    /* console.log(`Resolved response token: ${captchaResponse}`); */
  }
}
