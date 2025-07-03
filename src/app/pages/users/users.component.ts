import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Patient } from '../../clases/patient';
import { Professional } from '../../clases/professional';
import { AuthService } from '../../services/auth-service.service';
import { Appointment } from '../../clases/appointment';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { FormAdministradorComponent } from '../../componentes/form-administrador/form-administrador.component';
import { FormPacienteComponent } from '../../componentes/form-paciente/form-paciente.component';
import { FormProfesionalComponent } from '../../componentes/form-profesional/form-profesional.component';
import { RegistroComponent } from "../registro/registro.component";
import { ProfessionalListComponent } from '../../componentes/professional-list/professional-list.component';
import { PatientListComponent } from '../../componentes/patient-list/patient-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormPacienteComponent, FormProfesionalComponent, FormAdministradorComponent, RegistroComponent, ProfessionalListComponent, PatientListComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit
{
  userInfo: boolean;
  approveProfessional: boolean;
  formAdministrator: boolean;
  formPatient: boolean;
  formProfessional: boolean;
  patientsList: Patient[] = [];
  professionalList: Array<Professional> = [];
  forms: boolean;
  patient: Patient | undefined;
  patientAppointments: Appointment[] = [];
  fecha: Date = new Date();
  usuario: any;

  constructor(
    private authService: AuthService,
    private appointmentService:AppointmentService
  )
  {
    this.userInfo = true;
    this.approveProfessional = false;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
    this.forms = false;
    this.usuario = this.authService.usuario;
  }

  ngOnInit(): void
  {

    this.authService.getPatients().then((value: any) =>
    {
      console.log(value);
      
      this.patientsList = value;
    });

    this.authService.getProfessionals().then((value: any) =>
    {
      this.professionalList = value;
    });


  }

  showUserInfo()
  {
    this.userInfo = true;
    this.approveProfessional = false;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
    this.forms = false;
  }

  showApproveProfessional()
  {
    this.userInfo = false;
    this.approveProfessional = true;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
    this.forms = false;
  }
  showform()
  {
    this.userInfo = false;
    this.approveProfessional = false;
    this.formAdministrator = false;
    this.formPatient = false;
    this.formProfessional = false;
    this.forms = true;
  }

  showForms(who: string)
  {
    this.userInfo = false;
    this.approveProfessional = false;

    if (who == "administrator")
    {
      this.formAdministrator = true;
      this.formProfessional = false;
      this.formPatient = false;
    }
    else if (who == "professional")
    {
      this.formAdministrator = false;
      this.formProfessional = true;
      this.formPatient = false;
    }
    else
    {
      this.formAdministrator = false;
      this.formProfessional = false;
      this.formPatient = true;
    }

  }

  excel()
  {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    /* const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.patientsList); */

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, "Usuarios.xlsx");
  }

  onChoosePatient(patient:Patient){
    console.log('Selected patient:', patient);
    
    this.patient = patient;
    this.getMedicalRecords(patient);

  }
  getMedicalRecords(patient: Patient)
  {
    this.patientAppointments = this.appointmentService.appointments.filter((appointment: Appointment) => appointment.patient.id === patient.id);
  }

  pdf()
  {
    var data = document.getElementById('pdf');
    if (data) {
      html2canvas(data).then((canvas: { height: number; width: number; toDataURL: (arg0: string) => any; }) =>
      {
        var imgWidht = 210;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidht / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        var position = 0;
        pdf.addImage(contentDataURL, 'png', 0, position, imgWidht, imgHeight);
        pdf.save('MisDatos');
      });
    } else {
      console.error("Element with id 'pdf' not found.");
    }
  }

}
