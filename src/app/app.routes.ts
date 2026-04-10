import { Routes } from "@angular/router";
import { MoviesListComponent } from "./movies/movies-list/movies-list.component";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },

  // Home
  {
    path: "home",
    component: HomeComponent,
  },

  // Lista de filmes
  {
    path: "movies",
    component: MoviesListComponent,
  },

  // Detalhes do filme
  {
    path: "movies/details/:id",
    loadComponent: () =>
      import("./movies/movie-details/movie-details.component").then((m) => m.MovieDetailsComponent),
  },

  // Seleção de carros (lazy load)
  // {
  //   path: 'cars',
  //   loadComponent: () =>
  //     import('./cars/cars.component')
  //       .then(m => m.CarsComponent)
  // }
];
