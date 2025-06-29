import { Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';
import { Especialidad } from '../clases/especialidad';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {


  constructor(private authService: AuthService) { }

  getEspecialidades(): any {
    return this.authService.supabase
      .from('Especialidad')
      .select('*')
      .then((response) => {
        if (response.error) {
          console.error('Error al obtener posts:', response.error);
          return Promise.reject(response.error);
        } else {
          console.log('Especialidades obtenidas correctamente:', response.data);
          return Promise.resolve(response.data);
        }
      });
  }

  async addEspecialidad(newSpecialty: Especialidad) {
    await this.authService.supabase
      .from('Especialidad')
      .insert([
        {
          Especialidad: newSpecialty.Especialidad,
          Duracion: newSpecialty.duration,
        },
      ]);

  }

  subscribeEspecialidades(): Observable<any> {

    return new Observable<any>((observer) => {
      const channel = this.authService.supabase.channel('custom-all-channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'Especialidad' },
          (payload) => {
            console.log('Change received!', payload);
            observer.next(payload);
          }
        )
        .subscribe();
    });
  }


}
