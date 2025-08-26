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
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
