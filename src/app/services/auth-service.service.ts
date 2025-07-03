import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  usuario: any | undefined = "";
  email: string | undefined = "";

  supabase = createClient(environment.apiUrl, environment.publicAnonKey);

  constructor() {
  }

  async getUsuarioById(id: string) {

    const { data, error } = await this.supabase
      .from('Usuarios')
      .select('*')
      .eq('IdUsuario', id)
      .single();

    if (error) {
      console.log('Error al obtener el usuario:', error);

    }

    return data;
  }

  // subscribeUsuarios(): Observable<any> {

  //   return new Observable<any>((observer) => {
  //     const channel = this.supabase.channel('custom-all-channel')
  //       .on(
  //         'postgres_changes',
  //         { event: '*', schema: 'public', table: 'Usuarios' },
  //         (payload) => {
  //           console.log('Change received!', payload);
  //           observer.next(payload);
  //         }
  //       )
  //       .subscribe();

  //     // Cleanup function when unsubscribed
  //     return () => {
  //       this.supabase.removeChannel(channel);
  //     };
  //   });
  // }

  getProfessionals() {
    return this.supabase
      .from('Usuarios')
      .select('*')
      .eq('role', 'profesional')
      .then((response: { error: any; data: any; }) => {
        if (response.error) {
          console.error('Error al obtener posts:', response.error);
          return Promise.reject(response.error);
        } else {
          console.log('Profesionales obtenidos correctamente:', response.data);
          return Promise.resolve(response.data);
        }
      });
  }

  aprobarUsuario(id: string, approved: boolean) {
    return this.supabase
      .from('Usuarios')
      .update({ approved: approved })
      .eq('IdUsuario', id)
      .then((response: { error: any; data: any; }) => {
        if (response.error) {
          console.error('Error al aprobar usuario:', response.error);
          return Promise.reject(response.error);
        } else {
          console.log('Usuario aprobado correctamente:', response.data);
          return Promise.resolve(response.data);
        }
      });
  }
  getPatients() {
    return this.supabase
      .from('Usuarios')
      .select('*')
      .eq('role', 'paciente')
      .then((response: { error: any; data: any; }) => {
        if (response.error) {
          console.error('Error al obtener posts:', response.error);
          return Promise.reject(response.error);
        } else {
          console.log('Pacientes obtenidos correctamente:', response.data);
          return Promise.resolve(response.data);
        }
      });
  }


  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new Error(error.message);
    }
    this.setUser(data.user.id);
    this.registrarLogUsuario(email);
    console.log('login:', data);
    this.email = email; // Aseguramos que el email esté en el objeto de usuario

    return data;
  }

  private registrarLogUsuario(email: string) {
    // Grabar el registro del usuario en la base de datos de supabase llamada LogUsuarios
    var res = this.supabase
      .from('LogUsuario')
      .insert([
        {
          email: email, fecha: new Date().toISOString()
        },
      ])
      .select().then((response) => {
        if (response.error) {
          console.error('Error al registrar el LogUsuario:', response.error);
        } else {
          console.log('LogUsuario registrado correctamente:', response.data);
        }
      });
  }

  private async setUser(id: string) {
    await this.supabase.from('Usuarios')
      .select('*')
      .eq('IdUsuario', id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching user email:', error);
        } else {
          this.usuario = data;
          console.log('setUser:', this.usuario);
        }
      });
  }

  async register(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async registrarDatosusuario(datos: any) {
    // Grabar los datos del usuario en la base de datos de supabase llamada Usuarios
    // console.log(datos);

    var respuesta = await this.supabase
      .from('Usuarios')
      .insert([
        {
          nombre: datos.nombre,
          apellido: datos.apellido,
          edad: datos.edad,
          dni: datos.dni,
          obraSocial: datos.obraSocial,
          Foto1: datos.Foto1,
          Foto2: datos.Foto2,
          role: datos.role,
          IdUsuario: datos.id, // Asegúrate de que 'id' es el ID del usuario autenticado
        },
      ]);

    // console.log('Respuesta al registrar datos de usuario:', respuesta);
  }

  async registrarEspecialidadesUsuario(datos: any) {
    console.log('Registrando especialidades para el usuario:', datos);

    await this.supabase
      .from('EspecialidadUsuario')
      .insert([
        {
          IdUsuario: datos.IdUsuario,
          IdEspecialidad: datos.IdEspecialidad
        }
      ]);
  }

  async subirImagenUsuario(file: File, userId: string): Promise<string> {
    const filePath = `usuarios/${userId}/${file.name}`;
    const { data, error } = await this.supabase.storage.from('imagenes').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

    if (error) {
      throw error;
    } else if (data && data.path) {
      return data.path;
    } else {
      throw new Error('Unknown error uploading image');
    }
  }

  async getImagenDeUsuario(filePath: string) {
    return await this.supabase.storage.from('imagenes').getPublicUrl(filePath).data.publicUrl;
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }

  async getUser() {
    const { data, error } = await this.supabase.auth.getUser();
    if (error || !data.user) {
      throw new Error(error?.message || 'No user is logged in');
    }
    console.log('Usuario obtenido:', data.user);
    this.email = data.user.email; // Aseguramos que el email esté en el objeto de usuario
    await this.setUser(data.user.id);
    return this.email;
  }

  async isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await this.supabase.auth.getSession();
    return !!session;
  }


}
