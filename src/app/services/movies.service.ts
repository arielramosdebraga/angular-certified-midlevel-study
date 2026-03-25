import {inject, Injectable, Signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie.model';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  protected httpClient = inject(HttpClient);

  getMovies(): Signal<Movie[]> {
    return toSignal(this.httpClient.get<Movie[]>('/movies'), {initialValue: []});
  }
}
