import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender, // Home is prerendered
  },
  {
    path: 'artist/:name',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams(): Promise<Array<Record<string, string>>> {
      return [
        { name: 'taylor-swift' },
        { name: 'eminem' },
        { name: 'beyonce' },
      ];
    },
  },

  {
    path: 'albums/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams(): Promise<Array<Record<string, string>>> {
      return [{ id: '2324234324' }, { id: '23242344324' }];
    },
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
