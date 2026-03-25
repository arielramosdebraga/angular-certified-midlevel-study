import {Injectable, signal} from '@angular/core';
import { Movie } from '../model/movie.model';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  
  private favorites = signal<Movie[]>([]);

  getFavorites() {
    return this.favorites();
  }

  toggleFavorite(movie: Movie) {
    const currentFavorites = this.favorites();
    const index = currentFavorites.findIndex(m => m.id === movie.id);
    
    if (index > -1) {
      this.favorites.set(currentFavorites.filter(m => m.id !== movie.id));
    } else {
      this.favorites.set([...currentFavorites, movie]);
    }
  }

  isFavorite(movie: Movie): boolean {
    return this.favorites().some(m => m.id === movie.id);
  }
}
