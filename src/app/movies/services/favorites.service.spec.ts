import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Movie } from '../models/movie.model';

describe('FavoritesService', () => {
  let service: FavoritesService;

  const movie: Movie = {
    id: '1',
    title: 'Batman',
    duration: 120,
    budget: 100,
    release_date: '2020-01-01',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should add movie when not in favorites', () => {
    service.toggleFavorite(movie);

    const isFav = service.isFavorite(movie);
    expect(isFav()).toBe(true);
  });

  it('should remove movie when already in favorites (covers splice branch)', () => {
    service.toggleFavorite(movie); // add
    service.toggleFavorite(movie); // remove

    const isFav = service.isFavorite(movie);
    expect(isFav()).toBe(false);
  });

  it('should handle multiple movies correctly', () => {
    const movie2: Movie = {
      id: '2',
      title: 'Superman',
      duration: 110,
      budget: 90,
      release_date: '2019-01-01',
    };

    service.toggleFavorite(movie);
    service.toggleFavorite(movie2);

    expect(service.isFavorite(movie)()).toBe(true);
    expect(service.isFavorite(movie2)()).toBe(true);

    service.toggleFavorite(movie);

    expect(service.isFavorite(movie)()).toBe(false);
    expect(service.isFavorite(movie2)()).toBe(true);
  });
});
