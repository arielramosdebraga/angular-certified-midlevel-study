import {Component, inject, Signal} from '@angular/core';
import {Movie} from '../model/movie.model';
import {MoviesService} from '../services/movies.service';
import {FavoritesService} from '../services/favorites.service';
import {MovieItemComponent} from '../movie-item/movie-item.component';
import {HighlightDirective} from '../highlight.directive';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      @for(movie of movies(); track movie.id) {
        <app-movie-item 
          [movie]="movie" 
          appHighlight 
          [isFavorite]="favoritesService.isFavorite(movie)()" 
          (toggleFavorite)="favoritesService.toggleFavorite(movie)"
        />
      }
    </div>
  `,
  imports: [MovieItemComponent, HighlightDirective],
})
export class HomeComponent {
  protected movies: Signal<Movie[]> = inject(MoviesService).getMovies();
  protected favoritesService = inject(FavoritesService);
}