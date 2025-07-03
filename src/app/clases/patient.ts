import { Usuario } from "./usuario";

export class Patient extends Usuario{
    public age:number = 0;
    public dni:string = "";
    public obraSocial:string = "";
Foto1: any;
Foto2: any;
nombre: any;
apellido: any;
edad: any;

    public constructor(init?: Partial<Patient>) {
        super()
        if(init){            
            Object.assign(this, init);
        }
        else{
            this.photos = new Array();
        }
    }

    

    public static override CreatePatient(id: string, name: string, lastName: string,
        photos: Array<any>, email: string) :Patient {
        let patient = new Patient();
        
        patient.id = id;
        patient.name = name;
        patient.lastName = lastName;
        patient.photos = photos;
        patient.email = email;
        

        return patient;
    }


}