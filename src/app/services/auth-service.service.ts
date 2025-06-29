import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: string | undefined = "";

  supabase = createClient(environment.apiUrl, environment.publicAnonKey);

  constructor() {
    this.setUserEmail();
  }


  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new Error(error.message);
    }
    this.setUserEmail();
    this.registrarLogUsuario(email);
    return data;
  }

  private registrarLogUsuario(email: string) {
    // Grabar el registro del usuario en la base de datos de supabase llamada LogUsuarios

    var res = this.supabase
      .from('LogUsuario')
      .insert([
        { usuario: email, fechaDeIngreso: new Date().toISOString() },
      ])
      .select().then((response) => {
        if (response.error) {
          console.error('Error al registrar el usuario:', response.error);
        } else {
          console.log('Usuario registrado correctamente:', response.data);
        }
      });
  }

  private setUserEmail() {
    this.getUser().then(user => {
      this.usuario = user.email;
      console.log('Usuario autenticado:', this.usuario);
    }).catch(err => {
      console.error('Error fetching user:', err);
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
    await this.supabase
      .from('Especialidades')
      .insert([
        {
          IdUsuario: datos.id,
          IdEspecialidad: datos.IdEspecialidad
        }
      ])
      .select();
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

  async getImagenDeUsuario(filePath: string){
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
    return data.user;
  }

  async isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await this.supabase.auth.getSession();
    return !!session;
  }


}
