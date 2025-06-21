import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EncuestaService } from '../../services/encuesta.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {


  userForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  mensaje: string = '';
  colorAlert: string = '';
  minimo: number = 0;

  constructor(
    private encuestaService: EncuestaService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit(): void {

    this.userForm?.controls['usuario']?.setValue(this.authService.usuario);


  }

  createForm() {
    this.userForm = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      edad: ["", [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ["", [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      satisfecho: [3, Validators.required],
      tiempoOcio: ["", Validators.required],
      tipoJuego: ["", Validators.required],
      sugerencia: [""]
    });
  }

  onSubmit() {
    console.log(this.userForm.value);
    
    this.encuestaService.addEncuesta(this.userForm.value).then(j => {
      //Agregado Correctamente
      this.colorAlert = "alert-success"
      this.mensaje = "Muchas gracias por su tiempo"
      this.submitted = true;
      setTimeout(
        () => {
          this.navigate();
        }, 2000
      )
    })
  }

  navigate() {
    this.router.navigate(['Home']);
  }

}
