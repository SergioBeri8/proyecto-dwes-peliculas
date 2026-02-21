import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../../core/services/movie.service';
import { AuthService } from '../../../../core/services/auth.service';
import { FavoritesService } from '../../../../core/services/favorites.services';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private movieService = inject(MovieService);
  private authService = inject(AuthService);
  // Inyectamos el servicio de favoritos para el CRUD
  public favoritesService = inject(FavoritesService);

  movies = signal<any[]>([]); 
  userEmail = this.authService.currentUser()?.email;

  ngOnInit() {
    // 1. Cargamos pelis populares de TMDB
    this.movieService.getPopularMovies().subscribe({
      next: (res) => this.movies.set(res.results),
      error: (err) => console.error('Error TMDB:', err)
    });

    // 2. Cargamos tus favoritos guardados en Supabase
    this.favoritesService.getFavorites();
  }

  // Acción de añadir/quitar favorito (Create / Delete)
  async onToggleFavorite(movie: any) {
    const isFav = this.isFavorite(movie.id);
    
    if (isFav) {
      const favItem = this.favoritesService.myFavorites().find(f => f.movie_id === movie.id);
      if (favItem) await this.favoritesService.removeFavorite(favItem.id);
    } else {
      await this.favoritesService.addFavorite(movie);
    }
  }

  // Comprobar si una peli ya está en favoritos
  isFavorite(movieId: number): boolean {
    return this.favoritesService.myFavorites().some(f => f.movie_id === movieId);
  }

  logout() {
    this.authService.signOut();
  }
}