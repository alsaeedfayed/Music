import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'explore',
    pathMatch: 'full',
  },
  {
    path: 'explore',
    loadComponent: () => import('@features/home/home').then((m) => m.Home),
  },
  {
    path: 'artist/:name',
    loadComponent: () =>
      import('@features/artist/artist').then((m) => m.Artist),
    data: {
      title: 'artist page',
    },
  },
  {
    path: 'albums/:id',
    loadComponent: () =>
      import('@features/albums-cmp/album').then((m) => m.AlbumsCmp),
    data: {
      title: 'albums',
    },
  },
  {
    path: 'library',
    loadComponent: () =>
      import('@features/library/library').then((m) => m.Library),
  },
];
