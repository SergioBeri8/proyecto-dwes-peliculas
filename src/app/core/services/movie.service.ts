import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);

  // Configuramos las cabeceras con tu token
  private headers = new HttpHeaders({
    Authorization: `Bearer ${environment.tmdbApiKey}`
  });

  getPopularMovies(): Observable<any> {
    return this.http.get(`${environment.tmdbApiUrl}/movie/popular?language=es-ES`, {
      headers: this.headers
    });
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${environment.tmdbApiUrl}/search/movie?query=${query}&language=es-ES`, {
      headers: this.headers
    });
  }
}