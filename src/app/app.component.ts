import {Component, inject, Signal} from '@angular/core';
import {MovieItemComponent} from './movie-item/movie-item.component';
import {Movie} from './model/movie.model';
import {MoviesService} from './services/movies.service';
import {HighlightDirective} from './highlight.directive';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    MovieItemComponent, HighlightDirective
  ]
})
export class AppComponent {

  private moviesService = inject(MoviesService);
  private favoritesService = inject(FavoritesService);

  protected movies: Signal<Movie[]> = this.moviesService.getMovies();

  isFavorite(movie: Movie): boolean {
    return this.favoritesService.isFavorite(movie);
  }

  toggleFavorite(movie: Movie) {
    this.favoritesService.toggleFavorite(movie);
  }
}
