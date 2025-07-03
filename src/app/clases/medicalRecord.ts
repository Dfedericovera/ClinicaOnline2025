import { Patient } from './patient';
import { Professional } from './professional';

export class MedicalRecord{
    id:string = "";
    altura:number = 0;
    peso:number = 0;
    temperatura:number = 0;
    presion:number = 0;
    timeStamp:number = 0;
    patient:Patient = new Patient();
    professional:Professional = new Professional();
    label1: any;
    valor1: any;
    label2: any;
    valor2: any;
    label3: any;
    valor3: any;

    public constructor(init?: Partial<MedicalRecord>) {
        if(init){
            Object.assign(this, init);
        }        
    }
}