import { inject, Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private supabase: SupabaseClient;
  private authService = inject(AuthService);
  
  // Signal para tener los favoritos sincronizados en toda la app
  myFavorites = signal<any[]>([]);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // CREATE: Guardar una peli
  async addFavorite(movie: any) {
    const user = this.authService.currentUser();
    if (!user) return;

    const { data, error } = await this.supabase
      .from('favorites')
      .insert({
        user_id: user.id,
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path
      });
    
    if (!error) this.getFavorites(); // Recargamos la lista
    return { data, error };
  }

  // READ: Obtener favoritos del usuario logueado
  async getFavorites() {
    const user = this.authService.currentUser();
    if (!user) return;

    const { data, error } = await this.supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id);

    if (data) this.myFavorites.set(data);
  }

  // DELETE: Quitar de favoritos
  async removeFavorite(favoriteId: number) {
    const { error } = await this.supabase
      .from('favorites')
      .delete()
      .eq('id', favoriteId);

    if (!error) this.getFavorites();
  }
}