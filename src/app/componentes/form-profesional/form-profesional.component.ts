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

@Component({
  selector: 'app-form-profesional',
  imports: [AlertComponent, CommonModule, ReactiveFormsModule, SpecialtyListComponent, SpecialtyFormComponent],
  templateUrl: './form-profesional.component.html',
  styleUrl: './form-profesional.component.css'
})
export class FormProfesionalComponent {

  professionalForm: FormGroup = new FormGroup({});
  photo1: FileI | null = null;
  photo2: FileI | null = null;
  photos: Array<FileI> = [];
  registered: boolean = false;
  specialtys: Especialidad[] = [];
  specialtysChoosen: Especialidad[] = [];
  showSpecialtyForm:boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    // private profesionalService: ProfessionalService,
    private router: Router,
    // private specialtyService: SpecialtyService
  )
  {
    this.showSpecialtyForm = false;
    this.registered = false;
    this.photos = new Array();
  }

  ngOnInit(): void
  {
    this.createForm();
    // this.specialtyService.getSpecialtys().subscribe(specialtys =>
    // {
    //   this.specialtys = specialtys;
    // })
  }

  createForm()
  {
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
      usertype:[UserType.PROFESSIONAL],
      recaptchaReactive: ["", Validators.required],
    });
  }

  verError(){
    console.log(this.professionalForm );
    
  }

  onSubmit()
  {
    try
    {
      /* console.log(this.professionalForm.value); */
      this.assignPhotos();
      // this.authService.register(this.professionalForm.controls.email.value, this.professionalForm.controls.password.value).then(user =>
      // {
      //   if (user)
      //   {
      //     this.professionalForm.controls['id'].setValue(user.uid);
      //     this.professionalForm.controls['approved'].setValue(false);
      //     this.professionalForm.removeControl("password");
      //     this.profesionalService.createProfessional(this.professionalForm.value, this.photos).then(patient =>
      //     {
      //       console.log('Professional Created', patient);
      //       user.updateProfile({
      //         displayName: patient.name,
      //       }).then(() =>
      //       {
      //         console.log('Now Verify your email to login.');
      //         this.registered = true;
      //       })
      //     });
      //     this.professionalForm.addControl("password",this.fb.control({password: "111111"}))
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
    }/* 
    if(this.photo2){
      this.photos.push(this.photo2);
    } */
  }

  navigate()
  {
    this.router.navigate(['/login']);
  }

  onChooseSpecialty(specialty: Especialidad)
  {
    if (!this.specialtysChoosen)
    {
      this.specialtysChoosen = [];
      this.specialtysChoosen.push(specialty);
      this.professionalForm.controls['specialty'].setValue(this.specialtysChoosen);
      console.log(specialty);
    }
    else
    {
      let isAlreadyChoosen = false;
      this.specialtysChoosen.forEach(specialtyChoosen =>
      {
        if (specialty.specialty == specialtyChoosen.specialty)
        {
          isAlreadyChoosen = true;
        }
      })
      if (!isAlreadyChoosen)
      {
        this.specialtysChoosen.push(specialty);
        this.professionalForm.controls['specialty'].setValue(this.specialtysChoosen);
        console.log(specialty);
      }
    }


  }

  deleteSpecialty(index:any)
  {
    this.specialtysChoosen.splice(index,1);
  }
  resolved(captchaResponse: any)
  {
    /* console.log(`Resolved response token: ${captchaResponse}`); */
  }
}
