import {Component, inject, Signal} from '@angular/core';
import {MovieItemComponent} from './movie-item/movie-item.component';
import {Movie} from './model/movie.model';
import {MoviesService} from './services/movies.service';
import {HighlightDirective} from './highlight.directive';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    MovieItemComponent, HighlightDirective
  ]
})
export class AppComponent {

  protected movies: Signal<Movie[]> = inject(MoviesService).getMovies();

}
