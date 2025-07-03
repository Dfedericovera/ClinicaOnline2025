import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../clases/appointment';
import { map } from 'rxjs/operators';
import { AuthService } from './auth-service.service';
import { RealtimeChannel } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

    public appointments: Array<Appointment> = [];  
  
    constructor(
      private authService: AuthService
    )
    {
      this.getAppointments()
    }
  
    //Devuelve un Observable de tipo Appointment Array.
    getAppointments(): any
    {
      this.authService.supabase
        .from('appointments')
        .select('*')
        .then((response) => { 
          if (response.data) {
            this.appointments = response.data.map((appointment: any) => {
              console.log('Appointment data:', appointment);
              
              return new Appointment(appointment.data);
            });
          }
        });

    }
  
    /* 
      ordenarFecha(a:Appointment, b:Appointment) {
        if (a.fecha as  > b.fecha) {
          return 0;
        }
        if (a.fecha < b.fecha) {
          return -1;
        }
        return 1;
      }
      ordenarHora(a:Appointment, b:Appointment) {
        if (a.hora > b.hora) {
          return 0;
        }
        if (a.hora < b.hora) {
          return -1;
        }
        return 1;
      } */
    
    //Metodo para crear un nuevo Appointment en la DB
    addAppointment(appointment: Appointment)
    {
      //?Con esto FireBase se encarga de todo,
      //?no hay que pensar en endpoints o si esta o no creada la tabla.
      //?Adicionamos un nuevo paciente a la tabla.
      // return new Promise<Appointment>((resolve, reject) =>
      // {
      //   this.appointmentsDB
      //     .add(JSON.parse(JSON.stringify(appointment)))
      //     .then(res =>
      //     {
      //       appointment.id = res.id;
      //       this.editAppointment(appointment);
      //       resolve(appointment);
      //     }, err => reject(console.error(err)));
      // });
  
    }
  
    //Delete a Appointment de la DB
    deleteAppointment(appointment: Appointment)
    {
      // try
      // {
      //   return this.db
      //     .collection("appointments")
      //     .doc(appointment.id)
      //     .delete()
      //     .then(res => { console.log(res) });
  
      // } catch (error)
      // {
      //   console.log('Error: ', error);
      // }
  
    }
  
    //Edit a Appointment
    editAppointment(newAppointment:any)
    {
      // return this.db
      //   .collection("appointments")
      //   .doc(newAppointment.id)
      //   .set(JSON.parse(JSON.stringify(newAppointment)));  
    }
}
