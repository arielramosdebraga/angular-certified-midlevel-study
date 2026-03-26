import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Movie, MovieDetails } from '../models/movie.model';

describe('MoviesService', () => {
  let service: MoviesService;

  let httpClientMock: {
    get: jest.Mock;
  };

  const mockMovies: Movie[] = [
    {
      id: '1',
      title: 'Batman',
      duration: 120,
      budget: 100,
      release_date: '2020-01-01',
    },
    {
      id: '2',
      title: 'Superman',
      duration: 110,
      budget: 90,
      release_date: '2019-01-01',
    },
  ];

  const mockDetails: MovieDetails = {
    ...mockMovies[0],
    box_office: 1000,
    cinematographers: ['John'],
    poster: 'img.png',
    producers: ['Prod'],
    summary: 'Test',
  };

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [MoviesService, { provide: HttpClient, useValue: httpClientMock }],
    });

    service = TestBed.inject(MoviesService);
  });

  it('should call getMovies and return data', (done) => {
    httpClientMock.get.mockReturnValue(of(mockMovies));

    service.getMovies().subscribe((movies) => {
      expect(movies).toEqual(mockMovies);
      expect(httpClientMock.get).toHaveBeenCalledWith('/movies');
      done();
    });
  });

  it('should call getMovieDetails with correct id', (done) => {
    httpClientMock.get.mockReturnValue(of(mockDetails));

    service.getMovieDetails('1').subscribe((movie) => {
      expect(movie).toEqual(mockDetails);
      expect(httpClientMock.get).toHaveBeenCalledWith('/movies/1');
      done();
    });
  });

  it('should filter by title only (year < 4)', (done) => {
    httpClientMock.get.mockReturnValue(of(mockMovies));

    service.filterMovieList('bat', '').subscribe((movies) => {
      expect(movies.length).toBe(1);
      expect(movies[0].title).toBe('Batman');
      done();
    });
  });

  it('should filter by year when year has 4 characters', (done) => {
    httpClientMock.get.mockReturnValue(of(mockMovies));

    service.filterMovieList('', '2020').subscribe((movies) => {
      expect(movies.length).toBe(1);
      expect(movies[0].release_date).toContain('2020');
      done();
    });
  });

  it('should return empty when no match', (done) => {
    httpClientMock.get.mockReturnValue(of(mockMovies));

    service.filterMovieList('xyz', '2022').subscribe((movies) => {
      expect(movies.length).toBe(0);
      done();
    });
  });
});
