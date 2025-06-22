import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { textSpanIntersectsWithTextSpan } from 'typescript';
import { Especialidad } from '../../clases/especialidad';
import { AuthService } from '../../services/auth-service.service';
import { AlertComponent } from "../alert/alert.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specialty-form',
  standalone: true,
  imports: [AlertComponent, CommonModule,ReactiveFormsModule],
  templateUrl: './specialty-form.component.html',
  styleUrls: ['./specialty-form.component.sass']
})
export class SpecialtyFormComponent implements OnInit
{
  @Output() specialty = new EventEmitter<Especialidad>();
  specialtyForm: FormGroup = new FormGroup({});
  mostrarMensaje:boolean;
  spinner:boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    // private patientService: PatientService,
    // private router: Router,
    // private specialtyService: SpecialtyService
  )
  { 
    this.mostrarMensaje = false;
    this.spinner = false;
  }

  ngOnInit(): void
  {
    this.createFormSpecialty();
  }

  createFormSpecialty()
  {
    this.specialtyForm = this.fb.group({
      specialty: ["", Validators.required],
      duration: ["", Validators.required]
    });
  }
  addSpecialty()
  {
    this.spinner = true;
    console.log(this.specialtyForm.value);
    var newSpecialty = new Especialidad();
    newSpecialty.specialty = this.specialtyForm.controls['specialty'].value;
    newSpecialty.duration = this.specialtyForm.controls['duration'].value;
    // this.specialtyService.addSpecialty(newSpecialty).then(value =>
    // {
    //   this.spinner = false;
    //   this.mostrarMensaje = !this.mostrarMensaje;
    //   this.specialty.emit(newSpecialty);
    // })
  }

  resetForm(){
    this.mostrarMensaje = !this.mostrarMensaje;
    this.specialtyForm.reset();
  }

}
