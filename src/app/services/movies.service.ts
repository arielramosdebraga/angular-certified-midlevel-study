import {inject, Injectable, Signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Movie, MovieDetails} from '../model/movie.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  protected httpClient = inject(HttpClient);

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('/movies');
  }

  getMovieDetails(movieId: string): Observable<MovieDetails> {
    return this.httpClient.get<MovieDetails>('/movies/'+ movieId);
  }
}
