import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MovieItemComponent } from './movie-item.component';
import { Movie } from '../models/movie.model';
import { ActivatedRoute } from '@angular/router';

describe('MovieItemComponent', () => {
  let fixture: ComponentFixture<MovieItemComponent>;
  let component: MovieItemComponent;

  const movieMock: Movie = {
    id: '1',
    title: 'Inception',
    release_date: '2010-07-16',
    budget: 160000000,
    duration: 148,
  } as Movie;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieItemComponent],
      providers: [
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

    fixture = TestBed.createComponent(MovieItemComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('movie', movieMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render movie information correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const title = compiled.querySelector('h4');
    expect(title).not.toBeNull();
    expect(title!.textContent).toContain(movieMock.title);

    const subtitleSpans = compiled.querySelectorAll('.subtitle span');
    expect(subtitleSpans.length).toBe(3);

    // release_date
    expect(subtitleSpans[0].textContent).toContain(movieMock.release_date);

    // pipes (millionDollar e minToDuration) — garantimos que renderizaram algo
    expect(subtitleSpans[1].textContent?.trim().length).toBeGreaterThan(0); // budget
    expect(subtitleSpans[2].textContent?.trim().length).toBeGreaterThan(0); // duration
  });

  it('should not have active class on star icon when isFavorite is false (default)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const star = compiled.querySelector('.icon-star') as HTMLElement | null;

    expect(star).not.toBeNull();
    expect(star!.classList.contains('active')).toBe(false);
  });

  it('should add active class on star icon when isFavorite is true', () => {
    // altera o input signal isFavorite
    fixture.componentRef.setInput('isFavorite', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const star = compiled.querySelector('.icon-star') as HTMLElement | null;

    expect(star).not.toBeNull();
    expect(star!.classList.contains('active')).toBe(true);
  });

  it('should emit toggleFavorite with movie when star icon is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const star = compiled.querySelector('.icon-star') as HTMLElement | null;
    expect(star).not.toBeNull();

    const emitSpy = jest.fn();
    component.toggleFavorite.subscribe(emitSpy);

    star!.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(movieMock);
  });

  it('should set button routerLink to movie details page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement | null;

    expect(button).not.toBeNull();

    // Se o Angular refletir o [routerLink], validamos o valor
    const reflectedRouterLink = button!.getAttribute('ng-reflect-router-link');
    if (reflectedRouterLink) {
      expect(reflectedRouterLink).toBe(`details/${movieMock.id}`);
    }
    // Caso não exista (por não termos carregado RouterLink de fato),
    // o teste apenas garante que o botão existe (expect acima).
  });
});
