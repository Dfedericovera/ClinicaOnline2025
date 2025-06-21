import { Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  getEncuestas() {
    return this.auth.supabase
      .from('encuesta')
      .select('*')
      .then((response) => {
        if (response.error) {
          console.error('Error al obtener encuestas:', response.error);
          return Promise.reject(response.error);
        } else {
          console.log('Encuestas obtenidas correctamente:', response.data);
          return Promise.resolve(response.data);
        }
      });
  }

  constructor(private auth: AuthService) { }

  addEncuesta(encuesta: any) {
    console.log('Enviando encuesta:', encuesta);
     
    return this.auth.supabase
      .from('encuesta')
      .insert([
        { nombre: encuesta.nombre, apellido: encuesta.apellido, edad: encuesta.edad.toString(), telefono: encuesta.telefono, satisfecho: encuesta.satisfecho.toString(), tiempoOcio: encuesta.tiempoOcio, tipoJuego: encuesta.tipoJuego, sugerencia: encuesta.sugerencia,usuario: this.auth.usuario},
      ])
      .select().then((response) => {
        if (response.error) {
          console.error('Error al enviar msj:', response.error);
          return Promise.reject(response.error);
        } else {
          console.log('Mensaje enviado correctamente:', response.data);
          return Promise.resolve(response.data);
        }
      });
  }

}
