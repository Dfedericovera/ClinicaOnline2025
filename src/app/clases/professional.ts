import { Especialidad } from './especialidad';
import { Usuario } from './usuario';

export class Professional extends Usuario{
    
    public age:number | undefined;
    public dni:string | undefined;
    public specialty: Array<Especialidad> | undefined;    
    public approved:boolean | undefined;
    

    public constructor(init?: Partial<Professional>) {
        super()
        if(init){
            Object.assign(this, init);
        }        
    }

    

    public static CreateProfessional(id: string, name: string, lastName: string,
        photo: Array<any>, email: string,specialty: Array<Especialidad> ) :Professional {
        let profesional = new Professional();
        
        profesional.id = id;
        profesional.name = name;
        profesional.lastName = lastName;
        profesional.photos = photo;
        profesional.email = email;
        profesional.specialty = specialty;

        return profesional;
    }


}