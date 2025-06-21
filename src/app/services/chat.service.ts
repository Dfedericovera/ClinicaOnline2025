import { Injectable } from '@angular/core';
import { PostI } from '../interface/post';
import { AuthService } from './auth-service.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private auth: AuthService) { }

  createPost(post: PostI) {


    return this.auth.supabase
      .from('chat')
      .insert([
        { usuario: this.auth.usuario?.trim() ?? '', contenido: post.contenido ?? '' },
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

  subscribePosts(): Observable<any> {
    console.log('Suscribiendo a cambios en la tabla chat...');

    return new Observable<any>((observer) => {
      const channel = this.auth.supabase.channel('custom-all-channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'chat' },
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

  getPosts(): any {
    return this.auth.supabase
      .from('chat')
      .select('*')
      .order('timestamp', { ascending: true })
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



}
