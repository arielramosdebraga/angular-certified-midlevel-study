import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";
import { HighlightDirective } from "../../shared/directives/highlight.directive";
import { MovieItemComponent } from "../movie-item/movie-item.component";
import { MoviesService } from "../services/movies.service";
import { Movie } from "../models/movie.model";
import { FavoritesService } from "../services/favorites.service";

@Component({
  selector: "app-movies-list",
  standalone: true,
  imports: [HighlightDirective, MovieItemComponent, AsyncPipe, FormsModule],
  templateUrl: "./movies-list.component.html",
  styleUrl: "./movies-list.component.scss",
})
export class MoviesListComponent {
  private moviesService = inject(MoviesService);

  protected title = "";
  protected releaseDate: number;

  protected movies$: Observable<Movie[]> = this.moviesService.getMovies();
  protected favoritesService = inject(FavoritesService);

  filterMovies() {
    this.movies$ = this.moviesService.filterMovieList(
      this.title,
      this.releaseDate?.toString() ?? ""
    );
  }
}
