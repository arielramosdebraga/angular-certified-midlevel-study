import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'paginas',
    loadChildren: () =>
      import('@pages/template/template.routes').then((m) => m.ROUTES),
  },
];
