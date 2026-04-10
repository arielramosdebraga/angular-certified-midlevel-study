import { Component, input, output } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MillionDollarPipe } from "../../shared/pipes/million-dollar.pipe";
import { MinToDurationPipe } from "../../shared/pipes/min-to-duration.pipe";
import { Movie } from "../models/movie.model";

@Component({
  selector: "app-movie-item",
  template: `
    <div class="movie-item">
      <div>
        <h4>
          <span
            class="icon-star"
            [class.active]="isFavorite()"
            (click)="toggleFavorite.emit(movie())"
          ></span>
          {{ movie().title }}
        </h4>
        <small class="subtitle">
          <span>Release date: {{ movie().release_date }}</span>
          <span>Budget: {{ movie().budget | millionDollar }} </span>
          <span>Duration: {{ movie().duration | minToDuration }}</span>
        </small>
      </div>

      <button [routerLink]="'details/' + movie().id">Details</button>
    </div>
  `,
  imports: [MillionDollarPipe, MinToDurationPipe, RouterLink],
  styleUrls: ["movie-item.component.scss"],
})
export class MovieItemComponent {
  movie = input.required<Movie>();
  isFavorite = input<boolean>(false);
  toggleFavorite = output<Movie>();
}
