import {Component, inject} from '@angular/core';
import { MovieDetails } from '../model/movie.model';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MillionDollarPipe } from '../pipes/million-dollar.pipe';
import { MinToDurationPipe } from '../pipes/min-to-duration.pipe';
import {ActivatedRoute} from '@angular/router';
import {MoviesService} from '../services/movies.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  imports: [ NgOptimizedImage, MillionDollarPipe, MinToDurationPipe, AsyncPipe ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {

  private movieId = inject(ActivatedRoute).snapshot.paramMap.get("id") ?? "";
  protected movie$: Observable<MovieDetails> =
    inject(MoviesService).getMovieDetails(this.movieId);
}

