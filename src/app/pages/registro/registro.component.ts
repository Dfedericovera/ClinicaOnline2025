import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { FileI } from '../../interface/file';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../componentes/alert/alert.component';
import { Subscription } from 'rxjs';
import { FormPacienteComponent } from "../../componentes/form-paciente/form-paciente.component";
import { FormProfesionalComponent } from "../../componentes/form-profesional/form-profesional.component";
import { FormAdministradorComponent } from "../../componentes/form-administrador/form-administrador.component";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormPacienteComponent, FormProfesionalComponent, FormAdministradorComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  formChoosen: string = 'administrador'; // Default form type
  isChoosingForm: boolean;
  user: any;
  user$: Subscription = new Subscription();


  constructor(private authService: AuthService)
  {
    this.isChoosingForm = true;
  }

  ngOnInit(): void
  {
    this.getUser();
  }
  ngOnDestroy(){
    this.user$.unsubscribe();
  }
  getUser()
  {
    this.user = this.authService.usuario;
  }


  onChooseForm(formTipe: string)
  {
    this.isChoosingForm = false;
    this.formChoosen = formTipe;
  }


}
