import { Routes } from '@angular/router';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';

export const routes: Routes = [
  // Redireciona raiz para movies
  { path: '', redirectTo: 'movies', pathMatch: 'full' },

  // Lista de filmes
  {
    path: 'movies',
    component: MoviesListComponent,
  },

  // Detalhes do filme
  {
    path: 'movies/details/:id',
    loadComponent: () =>
      import('./movies/movie-details/movie-details.component').then((m) => m.MovieDetailsComponent),
  },

  // Seleção de carros (lazy load)
  // {
  //   path: 'cars',
  //   loadComponent: () =>
  //     import('./cars/cars.component')
  //       .then(m => m.CarsComponent)
  // }
];
