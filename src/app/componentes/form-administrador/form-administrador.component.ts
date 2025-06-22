import { Component } from '@angular/core';
import { FileI } from '../../interface/file';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { UserType } from '../../enumerados/userType';
import { AlertComponent } from "../alert/alert.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-administrador',
  imports: [AlertComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './form-administrador.component.html',
  styleUrl: './form-administrador.component.css'
})
export class FormAdministradorComponent {
  
  administratorForm: FormGroup = new FormGroup({});
  photo1: FileI | null = null;
  photos: Array<FileI> | null = null;
  registered: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    // private administratorService:AdministratorService,
    private router: Router,
  )
  {
    this.registered = false;
    this.photos = new Array();
  }

  ngOnInit(): void
  {
    this.createForm();
  }

  createForm()
  {
    this.administratorForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      dni: ["", [Validators.required, Validators.minLength(7)]],
      age: ["", [Validators.required, Validators.min(18), Validators.max(99)]],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      usertype:[UserType.ADMINISTRATOR],
      recaptchaReactive: ["", Validators.required],
    });
  }

  onSubmit()
  {
    try
    {
      this.assignPhotos();
      // this.authService.register(this.administratorForm.controls.email.value, this.administratorForm.controls.password.value).then(user =>
      // {
      //   if (user)
      //   {
      //     this.administratorForm.controls['id'].setValue(user.uid);
      //     this.administratorForm.removeControl("password");
      //     this.administratorService.createAdministrator(this.administratorForm.value, this.photos).then(patient =>
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
      //     this.administratorForm.addControl("password",this.fb.control({password: "111111"}))
      //   }
      // }).catch(error => { console.log('Error', error); });

    } catch (error)
    {
      console.error(error);
    }
  }

  handlePhoto1(file: Event)
  {
    const input = file.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.photo1 = {
        name: file.name,
        imageFile: file,
        size: file.size.toString(),
        type: file.type
      };
    } else {
      this.photo1 = null;
    }
  }

  assignPhotos()
  {
    if (this.photo1 && this.photos)
    {
      this.photos.push(this.photo1);
    }
  }

  resolved(captchaResponse: any)
  {
    /* console.log(`Resolved response token: ${captchaResponse}`); */
  }


}
