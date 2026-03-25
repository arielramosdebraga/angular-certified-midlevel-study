import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Movie, MovieDetails } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  protected httpClient = inject(HttpClient);

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('/movies');
  }

  getMovieDetails(movieId: string): Observable<MovieDetails> {
    return this.httpClient.get<MovieDetails>('/movies/' + movieId);
  }

  filterMovieList(title = '', year = ''): Observable<Movie[]> {
    return this.getMovies().pipe(
      map((movies) =>
        movies.filter(
          (movie) =>
            (year.length < 4 ||
              (year.length === 4 && movie.release_date.split('-')[0].includes(year))) &&
            movie.title.toLowerCase().includes(title)
        )
      )
    );
  }
}
