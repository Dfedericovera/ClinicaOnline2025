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
  imports: [AlertComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './form-paciente.component.html',
  styleUrl: './form-paciente.component.css'
})
export class FormPacienteComponent {
  
  patientForm: FormGroup = new FormGroup({});
  photo1: FileI | null = null;
  photo2: FileI | null = null;
  photos: Array<FileI> = new Array();
  registered: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    // private patientService: PatientService,
    private router:Router
  )
  {
    this.createForm();
  }

  ngOnInit(): void
  {
  }

  createForm()
  {
    this.patientForm = this.fb.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      age: ["", [Validators.required,Validators.min(1),Validators.max(110)]],
      dni: ["", Validators.required],
      obraSocial: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      usertype:[UserType.PATIENT],
      id:[""],
      recaptchaReactive: ["", Validators.required],
    });
  }

  onSubmit()
  {
    try
    {
      /* console.log(this.patientForm.value); */
      this.assignPhotos();
      // this.authService.register(this.patientForm.controls.email.value, this.patientForm.controls.password.value).then(user =>
      // {
      //   if (user)
      //   {
      //     this.patientForm.controls.id.setValue(user.uid);
      //     this.patientForm.removeControl("password");
      //     this.patientService.createPatient(this.patientForm.value, this.photos).then(patient =>
      //     {
      //       console.log('Created patient', patient);
      //       user.updateProfile({
      //         displayName: patient.name,
      //       }).then(() =>
      //       {
      //         console.log('Now Verify your email to login.');
      //         this.registered = true;
      //       })
      //     });
      //     this.patientForm.addControl("password",this.fb.control({password: "111111"}))
      //   }
      // }).catch(error => { console.log('Error', error); });

    } catch (error)
    {
      console.error(error);
    }
  }

  handlePhoto1(file: any)
  {
    this.photo1 = file.target.files[0];
  }

  handlePhoto2(file: any)
  {
    this.photo2 = file.target.files[0];
  }

  assignPhotos()
  {
    if (this.photo1)
    {
      this.photos.push(this.photo1);
    }
    if(this.photo2){
      this.photos.push(this.photo2);
    }
  }

  navigate(){
    this.router.navigate(['/login']);
  }

  resolved(captchaResponse: any)
  {
    /* console.log(`Resolved response token: ${captchaResponse}`); */
  }

}
