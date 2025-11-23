import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'categorias',
        loadChildren: () =>
          import('../categorias/categoria.routes').then((m) => m.ROUTES),
      },
    ],
  },
];
