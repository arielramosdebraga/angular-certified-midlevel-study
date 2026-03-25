import { Component, input } from '@angular/core';
import { Movie } from '../model/movie.model';

@Component({
  selector: 'app-movie-item',
  template: `
    <div class="movie-item">
      <div>
        <h4>{{ movie().title }}</h4>
        <small class="subtitle">
          <span>Release date: {{ movie().release_date }}</span>
          <span>Budget: $ {{ movie().budget }} million</span>
          <span>Duration: {{ movie().duration }} min</span>
        </small>
      </div>
      <button>Details</button>
    </div>
  `,
  styleUrls: ['movie-item.component.scss']
})
export class MovieItemComponent {
  movie = input.required<Movie>();
}

