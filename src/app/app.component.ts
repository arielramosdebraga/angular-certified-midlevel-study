import { Component, inject, Signal } from '@angular/core';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { Movie } from './model/movie.model';
import { MoviesService } from './services/movies.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    MovieItemComponent
  ]
})
export class AppComponent {

  private moviesService = inject(MoviesService);

  movies: Signal<Movie[]> = this.moviesService.getMovies();
}
