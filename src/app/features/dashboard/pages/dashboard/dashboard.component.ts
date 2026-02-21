import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../../core/services/movie.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // Importante para que el @for funcione
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private movieService = inject(MovieService);
  private authService = inject(AuthService);

  // El signal que ya tenías, ahora se llenará de datos
  movies = signal<any[]>([]); 
  // Obtenemos el email del usuario para saludarle
  userEmail = this.authService.currentUser()?.email;

  ngOnInit() {
    // Al cargar el componente, pedimos las pelis a la API
    this.movieService.getPopularMovies().subscribe({
      next: (res) => {
        this.movies.set(res.results);
      },
      error: (err) => {
        console.error('Error al traer pelis de TMDB:', err);
      }
    });
  }

  logout() {
    this.authService.signOut();
  }
}