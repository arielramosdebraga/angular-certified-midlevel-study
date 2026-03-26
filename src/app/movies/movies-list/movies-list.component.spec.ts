import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';
import { MoviesService } from '../services/movies.service';
import { of, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  let moviesServiceMock: {
    getMovies: jest.Mock<Observable<Movie[]>, []>;
    filterMovieList: jest.Mock<Observable<Movie[]>, [string, string]>;
  };

  const mockMovies: Movie[] = [
    {
      id: '1',
      title: 'Batman',
      duration: 120,
      budget: 100,
      release_date: '2020-01-01',
    },
  ];

  beforeEach(async () => {
    moviesServiceMock = {
      getMovies: jest.fn<Observable<Movie[]>, []>(() => of(mockMovies)),
      filterMovieList: jest.fn<Observable<Movie[]>, [string, string]>(
        (_title: string, _date: string) => of(mockMovies)
      ),
    };

    await TestBed.configureTestingModule({
      imports: [MoviesListComponent],
      providers: [
        { provide: MoviesService, useValue: moviesServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {},
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize movies$', (done) => {
    expect(component).toBeTruthy();
    expect(moviesServiceMock.getMovies).toHaveBeenCalled();

    component['movies$'].subscribe((movies) => {
      expect(movies).toEqual(mockMovies);
      done();
    });
  });

  it('should filter movies with releaseDate', () => {
    component['title'] = 'Batman';
    component['releaseDate'] = 2020;

    component.filterMovies();

    expect(moviesServiceMock.filterMovieList).toHaveBeenCalledWith('Batman', '2020');
  });

  it('should filter movies without releaseDate', () => {
    component['title'] = 'Batman';
    component['releaseDate'] = undefined as unknown as number;

    component.filterMovies();

    expect(moviesServiceMock.filterMovieList).toHaveBeenCalledWith('Batman', '');
  });
});
