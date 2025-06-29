import { DisponibilidadHoraria } from "../interface/disponibilidad-horaria";

export class Especialidad{

    id:string = "";
    Especialidad:string = "";
    duration:number = 0;
    public disponibilidadHoraria:DisponibilidadHoraria | undefined;

    public constructor(init?: Partial<Especialidad>) {
        if(init){
            Object.assign(this, init);
        }        
    }
}