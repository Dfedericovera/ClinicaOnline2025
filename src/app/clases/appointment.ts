import { Iencuesta } from '../interface/iencuesta';
import { Especialidad } from './especialidad';
import { MedicalRecord } from './medicalRecord';
import { Patient } from './patient';
import { Professional } from './professional';

export enum AppointmentState{
    Solicitado="Solicitado",
    Cancelado="Cancelado",
    Aceptado="Aceptado",
    Rechazado="Rechazado",
    Realizado="Realizado"
}
export class Appointment{
    id:string = "";
    timeStamp:number = 0;
    patient:Patient = new Patient();
    professional:Professional = new Professional();
    specialty:Especialidad = new Especialidad();
    state:AppointmentState = AppointmentState.Solicitado;
    review:string = "";
    comment:string = "";
    quiz:Iencuesta = {} as Iencuesta;
    medicalRecord:MedicalRecord = new MedicalRecord();


    public constructor(init?: Partial<Appointment>) {
        if(init){
            Object.assign(this, init);
        }        
    }
}