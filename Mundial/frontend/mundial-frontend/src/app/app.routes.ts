import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((component) => component.Home),
  },
  {
    path: 'equipos',
    loadComponent: () =>
      import('./equipos/equipos').then((component) => component.Equipos),
  },
  {
    path: 'jugadores',
    loadComponent: () =>
      import('./jugadores/jugadores').then((component) => component.Jugadores),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
