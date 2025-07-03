import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patient } from '../../clases/patient';
import * as XLSX from 'xlsx';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.sass']
})
export class PatientListComponent implements OnInit {

  @Input() patients: Patient[] = [];
  @Output() choosePatient: EventEmitter<Patient> = new EventEmitter<Patient>();
  user:any;

  constructor(private authService: AuthService) { 
    this.authService.getPatients().then((value: any) => {
      console.log(value);
      this.patients = value;
    });
    
  }

  ngOnInit(): void {
    this.user = this.authService.usuario;
  }

  onChoosePatient(patient:Patient){
    this.choosePatient.emit(patient);
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

}
