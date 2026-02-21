import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../../core/services/movie.service';
import { AuthService } from '../../../../core/services/auth.service';
import { FavoritesService } from '../../../../core/services/favorites.services';

// Componente Principal del Dashboard
// Implementa el consumo de API externa y la gestión de favoritos (CRUD).

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  // Uso de inject() para una inyección de dependencias más limpia (Angular moderno)
  private movieService = inject(MovieService);
  private authService = inject(AuthService);
  public favoritesService = inject(FavoritesService);

  // Signals para manejar el estado reactivo de la interfaz
  movies = signal<any[]>([]); 
  userEmail = this.authService.currentUser()?.email;

  ngOnInit() {
    // 1. Obtención de datos externos (TMDB) mediante Observables
    this.movieService.getPopularMovies().subscribe({
      next: (res) => this.movies.set(res.results),
      error: (err) => console.error('Error al conectar con TMDB:', err)
    });

    // 2. Sincronización de datos desde BD Supabase (Read del CRUD)
    this.favoritesService.getFavorites();
  }

  // Lógica Toggle para Favoritos (Create / Delete del CRUD).
  // Se apoya en el servicio para persistir los datos en Supabase.

  async onToggleFavorite(movie: any) {
    const isFav = this.isFavorite(movie.id);
    
    if (isFav) {
      // Si es favorito, buscamos el ID del registro en BD para eliminarlo
      const favItem = this.favoritesService.myFavorites().find(f => f.movie_id === movie.id);
      if (favItem) await this.favoritesService.removeFavorite(favItem.id);
    } else {
      // Si no es favorito, creamos un nuevo registro en la tabla 'favorites'
      await this.favoritesService.addFavorite(movie);
    }
  }

  // Comprueba si una película específica está en la lista de favoritos del Signal.
  isFavorite(movieId: number): boolean {
    return this.favoritesService.myFavorites().some(f => f.movie_id === movieId);
  }

  // Cierre de sesión redirigido al servicio de Auth.
  logout() {
    this.authService.signOut();
  }
}