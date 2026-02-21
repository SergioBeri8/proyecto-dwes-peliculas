import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

// Servicio de Autenticación
// Gestiona el ciclo de vida del usuario y la conexión con Supabase Auth.

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  
  // Signal para estado reactivo del usuario. Accesible desde toda la app (RA8).
  currentUser = signal<User | null>(null);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    // Escucha cambios de estado (Login, Logout, Token renovado).
    // Esto garantiza que el Signal esté siempre sincronizado con la sesión real.
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.currentUser.set(session?.user ?? null);
    });
  }

  // Registro de nuevos usuarios.
  // Almacena metadatos adicionales como el nombre completo en 'data'.
  async signUp(email: string, password: string, name?: string) {
    return await this.supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    });
  }

  // Login mediante email y contraseña. 
  // Supabase gestiona internamente la persistencia del JWT en LocalStorage.

  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  // Cierra la sesión y limpia el estado del usuario.
  async signOut() {
    return await this.supabase.auth.signOut();
  }
}