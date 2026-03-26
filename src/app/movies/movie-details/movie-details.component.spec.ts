import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MovieDetailsComponent } from './movie-details.component';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute } from '@angular/router';

describe('MovieDetailsComponent', () => {
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let component: MovieDetailsComponent;
  let moviesService: jest.Mocked<MoviesService>;

  const movieMock = {
    title: 'Inception',
    poster: 'http://example.com/poster.jpg',
    summary: 'A mind-bending thriller.',
    box_office: 829895144,
    budget: 160000000,
    duration: 148,
    producers: ['Emma Thomas', 'Christopher Nolan'],
    cinematographers: ['Wally Pfister'],
  };

  beforeEach(async () => {
    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('42'),
        },
      },
    } as unknown as ActivatedRoute;

    const moviesServiceStub: Partial<jest.Mocked<MoviesService>> = {
      getMovieDetails: jest.fn().mockReturnValue(of(movieMock)),
    };

    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: MoviesService, useValue: moviesServiceStub },
      ],
    }).compileComponents();

    moviesService = TestBed.inject(MoviesService) as jest.Mocked<MoviesService>;

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara o async pipe e renderiza o template
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call MoviesService.getMovieDetails with route id', () => {
    expect(moviesService.getMovieDetails).toHaveBeenCalledTimes(1);
    expect(moviesService.getMovieDetails).toHaveBeenCalledWith('42');
  });

  it('should render movie title and summary', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const title = compiled.querySelector('h1');
    expect(title).not.toBeNull();
    expect(title!.textContent).toBe(movieMock.title);

    const summarySpan = compiled.querySelector('p span:last-child');
    expect(summarySpan).not.toBeNull();
    expect(summarySpan!.textContent).toBe(movieMock.summary);
  });

  it('should render the poster image when movie has poster', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const img = compiled.querySelector('img') as HTMLImageElement | null;
    expect(img).not.toBeNull();

    // NgOptimizedImage geralmente reflete o valor em ng-reflect-ng-src
    const reflectedSrc = img!.getAttribute('ng-reflect-ng-src');
    if (reflectedSrc) {
      expect(reflectedSrc).toContain(movieMock.poster);
    } else {
      // fallback caso o atributo seja aplicado direto no src
      expect(img!.src).toContain(movieMock.poster);
    }
    expect(img!.getAttribute('alt')).toBe('Poster');
  });

  it('should render movie details in the table', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const caption = compiled.querySelector('table caption');
    expect(caption).not.toBeNull();
    expect(caption!.textContent).toContain('Details');

    const cells = compiled.querySelectorAll('tbody tr td');
    expect(cells.length).toBe(5);

    const [boxOfficeTd, budgetTd, durationTd, producersTd, cinematographersTd] = Array.from(cells);

    expect(boxOfficeTd.textContent?.trim().length).toBeGreaterThan(0);
    expect(budgetTd.textContent?.trim().length).toBeGreaterThan(0);
    expect(durationTd.textContent?.trim().length).toBeGreaterThan(0);

    expect(producersTd.textContent).toContain('Emma Thomas');
    expect(producersTd.textContent).toContain('Christopher Nolan');

    expect(cinematographersTd.textContent).toContain('Wally Pfister');
  });
});
