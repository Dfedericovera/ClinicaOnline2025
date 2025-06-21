import { Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { Juego } from '../clases/juego';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  constructor(private auth: AuthService) { }



  //Devuelve un Observable de tipo Juego Array.
  subscribeJuegos(): Observable<Juego[]> {
    console.log('Suscribiendo a cambios en la tabla juegos...');

    return new Observable<any>((observer) => {
      const channel = this.auth.supabase.channel('custom-all-channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'juegos' },
          (payload) => {
            console.log('Change received!', payload);
            observer.next(payload);
          }
        )
        .subscribe();

      // Cleanup function when unsubscribed
      return () => {
        this.auth.supabase.removeChannel(channel);
      };
    });
  }

  getJuegos(): any {
    return this.auth.supabase
      .from('juegos')
      .select('*')
      .order('id', { ascending: true })
      .then((response) => {
        if (response.error) {
          console.error('Error al obtener posts:', response.error);
          return Promise.reject(response.error);
        } else {
          console.log('Posts obtenidos correctamente:', response.data);
          return Promise.resolve(response.data);
        }
      });
  }

  //Metodo para crear un nuevo Juego en la DB
  addJuego(juego: Juego) {

    var date = new Date();
    var fecha = date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear();
    var hora = date.getHours().toString();

    return this.auth.supabase
      .from('juegos')
      .insert([
        { juego: juego.nombreJuego ?? '', jugador: this.auth.usuario?.trim() ?? '', fecha: fecha, hora: hora, resultado: juego.resultado ?? false },
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
