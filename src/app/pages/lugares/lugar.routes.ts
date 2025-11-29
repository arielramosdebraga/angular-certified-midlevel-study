import { Routes } from '@angular/router';
import { LugarComponent } from './lugar/lugar.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: LugarComponent,
    pathMatch: 'full',
  },
];
