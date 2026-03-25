import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {HighlightDirective} from '../highlight.directive';
import {MovieItemComponent} from '../movie-item/movie-item.component';
import {Movie} from '../model/movie.model';
import {MoviesService} from '../services/movies.service';
import {FavoritesService} from '../services/favorites.service';
import {Observable} from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    HighlightDirective,
    MovieItemComponent,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private moviesService = inject(MoviesService);

  protected title = '';
  protected releaseDate: number;

  protected movies$: Observable<Movie[]> = this.moviesService.getMovies();
  protected favoritesService = inject(FavoritesService);

filterMovies() {
  this.movies$ = this.moviesService.filterMovieList(
    this.title,
    this.releaseDate?.toString() ?? ''
  );
}
}